const async = require('async')
const _get = require('lodash/get')
const _find = require('lodash/find')

const mail = require('../../app/services/mail')

const User = require('../../app/models/user')
const Idea = require('../../app/models/idea')
const Task = require('../../app/models/task')

const utilities = require('../../app/utilities')

module.exports = function (app, passport) {
  // Get tasks
  app.get('/tasks/:idea_id',
    (req, res) => {
      Task.find({ _idea: req.params.idea_id }).exec((err, ideas) => {
        if (err) { return console.error(err) }
        res.json(ideas)
      })
    })
  // Get task
  app.get('/task/:id',
    (req, res) => {
      async.series({
        task: function (callback) {
          Task.findOne({ _id: req.params.id }).exec(callback)
        }
      }, function (err, results) {
        if (err) console.error(err)
        res.json({ task: results.task })
      })
    })
  // Create task
  app.post('/task',
    async (req, res) => {
      if (req.isAuthenticated()) {
        let data = req.body
        data.task._user = req.user._id
        data.task._idea = data.idea_id
        const newTask = new Task(data.task)

        let errors = []

        // Check title length
        if (!req.body.task.title || req.body.task.title.length < 3 || req.body.task.title.length > 40) {
          errors.push({
            text: 'Task title should be longer than 3 and less than 40 characters',
            type: 'error'
          })
        }

        // Check description is valid
        if (req.body.task.description && req.body.task.description.length > 1200) {
          errors.push({
            text: 'Task description should be less than 1,200 characters',
            type: 'error'
          })
        }
        
        if (errors.length > 0) {
          return res.json({
            errors: errors
          })
        }

        let task = await newTask.save()
        task = await Task.findOne({ _id: task._id })
        const idea = await Idea.findOne({ _id: task._idea })

        try {
          // Loop subscribers and mail out
          console.log('idea._subscribers')
          console.log(idea._subscribers)
          idea._subscribers.forEach(async (subscriber) => {
            const currentSubscriber = await User.findOne({ _id: subscriber._user._id })
            mail.sendMail(currentSubscriber.local.email, 'Task Created', 'task-created', { user: currentSubscriber, task: task, url: utilities.redirectUri(req.instance) })
          })
        } catch (error) {
          console.error('Failed mail out')
          console.error(error)
        }
        res.json({ task })
      } else {
        res.status(401)
      }
    })
  // Update task
  app.post('/task/destroy',
    (req, res) => {
      // Check permissions
      if (req.isAuthenticated()) {
        const isModerator = _find(_get(req.user, '_permissions'), { type: 'moderator', instance: req.instance })
        if (!isModerator) return res.status(401)
        Task.findOneAndUpdate(
          { _id: req.body.id },
          { destroyed: new Date() },
          { upsert: true },
          (err, task) => {
            if (err) console.error(err)
            res.json({ task })
          })
      } else {
        res.status(401)
      }
    })
}
