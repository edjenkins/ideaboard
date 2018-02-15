const async = require('async')

const Task = require('../../app/models/task')

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
    (req, res) => {
      if (req.isAuthenticated()) {
        let data = req.body
        data.task._user = req.user._id
        data.task._idea = data.idea_id
        const task = new Task(data.task)

        let errors = []

        // Check title length
        if (!req.body.task.title || req.body.task.title.length < 3 || req.body.task.title.length > 20) {
          errors.push({
            text: 'Task title should be longer than 3 and less than 20 characters',
            type: 'error'
          })
        }

        // Check description is valid
        if (!req.body.task.description || req.body.task.description.length < 8 || req.body.task.description.length > 240) {
          errors.push({
            text: 'Task description should be longer than 10 and less than 240 characters',
            type: 'error'
          })
        }
        
        if (errors.length > 0) {
          return res.json({
            errors: errors
          })
        }

        task.save((err) => {
          if (err) console.error(err)
          // mail.sendMail(req.user.local.email, 'Task Created', 'task-created', { user: req.user, task: task })
          res.json({ task })
        })
      } else {
        res.status(401)
      }
    })
  // Update task
  app.put('/task',
    (req, res) => {
      if (req.isAuthenticated()) {
        Task.findOneAndUpdate(
          { _id: req.body._id },
          req.body, (err, task) => {
            if (err) console.error(err)
            res.json({ task })
          })
      } else {
        res.status(401)
      }
    })
}
