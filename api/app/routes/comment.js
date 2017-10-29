const async = require('async')

const Comment = require('../../app/models/comment')
const Task = require('../../app/models/task')

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
        let data = req.body
        data._user = req.user._id
        const comment = new Comment(data)

        // If target is 'comment' then it is a reply so push to existing comment rather than saving it
        if (data.type === 'comment') {
          comment.save((err, comment) => {
            if (err) console.error(err)
            Comment.findOneAndUpdate(
              { _id: data._target },
              { $push: { _replies: comment } },
              (err, comment) => {
                if (err) console.error(err)
                // Notify users of replies
                Comment.findOne(
                  { _id: comment._id },
                  (err, comment) => {
                    if (err) console.error(err)
                    res.json({ comment })
                  })
              })
          })
        } else if (data.type === 'task') {
          comment.save((err, comment) => {
            if (err) console.error(err)
            Comment.findOne(
              { _id: comment._id },
              (err, comment) => {
                if (err) console.error(err)
                Task.findOneAndUpdate(
                  { _id: req.body._target },
                  { $push: { _responses: comment } },
                  (err, task) => {
                    if (err) console.error(err)
                    res.json({ comment })
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
}
