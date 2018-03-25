const async = require('async')

const _get = require('lodash/get')
const _find = require('lodash/find')

const mail = require('../../app/services/mail')
const utilities = require('../../app/utilities')

const Comment = require('../../app/models/comment')
const User = require('../../app/models/user')
const Task = require('../../app/models/task')
const TaskResponse = require('../../app/models/task-response')

module.exports = function (app, passport) {
  // Get comments
  app.get('/comments/:type/:target',
    (req, res) => {
      Comment.find({ _target: req.params.target, type: req.params.type }).exec((err, comments) => {
        if (err) { return console.error(err) }
        res.json(comments)
      })
    })
  // Get comment
  app.get('/comment/:id',
    (req, res) => {
      async.series({
        comment: function (callback) {
          Comment.findOne({ _id: req.params.id }).exec(callback)
        }
      }, function (err, results) {
        if (err) console.error(err)
        res.json({ comment: results.comment })
      })
    })
  // Post comment
  app.post('/comment',
    (req, res) => {
      if (req.isAuthenticated()) {
        var data = req.body
        data._user = req.user._id

        const comment = new Comment(data)

        // If target is 'comment' then it is a reply so push to existing comment rather than saving it
        if (data.type === 'comment') {
          comment.save((err, reply) => {
            if (err) console.error(err)
            Comment.findOneAndUpdate(
              { _id: data._target },
              { $push: { _replies: comment } },
              (err, comment) => {
                if (err) console.error(err)
                
                if (comment.type === 'task') {
                  // If task comment then push response to task
                  let response = {
                    response: comment._id,
                    _user: req.user._id,
                    type: 'discussion',
                    _task: req.body._target,
                    response_meta: {
                      text: req.body.text
                    }
                  }
                  const taskResponse = new TaskResponse(response)
                  taskResponse.save((err, response) => {
                    Task.findOneAndUpdate(
                      { _id: comment._target },
                      { $push: { _responses: response } },
                      (err, task) => {
                        if (err) console.error(err)
                        Comment.findOne(
                          { _id: reply._id },
                          (err, reply) => {
                            if (err) console.error(err)
                            Comment.findOne(
                              { _id: comment._id },
                              (err, comment) => {
                                if (err) console.error(err)
                                // Notify users of replies
                                User.findOne({ _id: comment._user }, (err, user) => {
                                  if (err) console.error(err)
                                  if (comment._user._id !== reply._user) {
                                    console.log(`Sending mail to - ${user.local.email}`)
                                    mail.sendMail(user.local.email, 'Comment Reply', 'comment-reply', { user: user, task: task, reply: reply, comment: comment, url: utilities.redirectUri(req.instance) })
                                  }
                                  res.json({ comment })
                                })
                              })
                          })
                      })
                  })
                } else {
                  // Notify users of replies
                  Comment.findOne(
                    { _id: comment._id },
                    (err, comment) => {
                      if (err) console.error(err)
                      res.json({ comment })
                    })
                }
              })
          })
        } else if (data.type === 'task') {
          comment.save((err, comment) => {
            if (err) console.error(err)
            Comment.findOne(
              { _id: comment._id },
              (err, comment) => {
                if (err) console.error(err)

                // If task comment then push response to task
                let response = {
                  response: comment._id,
                  _user: req.user._id,
                  type: 'discussion',
                  _task: req.body._target,
                  response_meta: {
                    text: req.body.text
                  }
                }
                const taskResponse = new TaskResponse(response)
                taskResponse.save((err, response) => {
                  Task.findOneAndUpdate(
                    { _id: req.body._target },
                    { $push: { _responses: response } },
                    (err, task) => {
                      if (err) console.error(err)
                      res.json({ comment })
                    })
                })
              })
          })
        } else {
          comment.save((err, comment) => {
            if (err) console.error(err)
            Comment.findOne(
              { _id: comment._id },
              (err, comment) => {
                if (err) console.error(err)
                res.json({ comment })
              })
          })
        }
      } else {
        res.status(401)
      }
    })
  // Destroy comment
  app.post('/comment/destroy',
    async (req, res) => {
      let comment = await Comment.findOne({ _id: req.body.id })

      const isModerator = _find(_get(req.user, '_permissions'), { type: 'moderator', instance: req.instance })
      const canDestroy = (isModerator || comment._user._id === req.user._id)
      if (!canDestroy) return res.status(401)
      
      Comment.findOneAndUpdate(
        { _id: req.body.id },
        { destroyed: new Date() },
        { upsert: true },
        (err, comment) => {
          res.json({ comment: comment })
        })
    })
}
