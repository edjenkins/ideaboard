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
