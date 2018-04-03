const async = require('async')
const _get = require('lodash/get')
const _find = require('lodash/find')

const TaskResponse = require('../../app/models/task-response')
const Task = require('../../app/models/task')

module.exports = function (app, passport) {
  // Get task responses
  app.get('/task/:type/:task_id/responses',
    (req, res) => {
      async.series({
        responses: function (callback) {
          TaskResponse.find({ _task: req.params.task_id, type: req.params.type }).exec(callback)
        }
      }, function (err, results) {
        if (err) console.error(err)
        res.json(results.responses)
      })
    })
  // Create task response
  app.post('/task/:type/:task_id/response',
    (req, res) => {
      if (req.isAuthenticated()) {
        let response = {
          response: req.body.response,
          _user: req.user._id,
          type: req.params.type,
          _task: req.params.task_id
        }
        if (req.params.type === 'media') {
          response.response_meta = req.body.response
          response.response = req.body.response.location
        }
        const taskResponse = new TaskResponse(response)

        taskResponse.save((err, taskResponse) => {
          if (err) console.error(err)
          TaskResponse.findOne(
            { _id: taskResponse._id },
            (err, taskResponse) => {
              if (err) console.error(err)
              Task.findOneAndUpdate(
                { _id: req.params.task_id },
                { $push: { _responses: taskResponse } },
                (err, task) => {
                  if (err) console.error(err)
                  res.json(taskResponse)
                })
            })
        })
      } else {
        res.status(401)
      }
    })
  // Like given task response
  app.put('/task/response/like',
    (req, res) => {
      if (req.isAuthenticated()) {
        async.waterfall([
          function (callback) {
            // Count user's likes
            TaskResponse.count({ _id: req.body.response_id, '_likes._user': req.user._id }, (err, result) => callback(null, result, err))
          },
          function (alreadyLiked, previousErr, callback) {
            console.log('Already liked - ', alreadyLiked)
            if (alreadyLiked) {
              // Remove like
              TaskResponse.findOneAndUpdate(
                { _id: req.body.response_id },
                { $pull: { _likes: { _user: req.user._id } } },
                (err, taskResponse) => callback(null, err, taskResponse))
            } else {
              // Like task response
              const like = {
                _user: req.user._id, // Current user is the liker
                likedAt: new Date()
              }
              TaskResponse.findOneAndUpdate(
                { _id: req.body.response_id },
                { $push: { _likes: like } },
                (err, taskResponse) => callback(null, err, taskResponse))
            }
          },
          function (previousErr, previousResult, callback) {
            // Remove dislike
            TaskResponse.findOneAndUpdate(
              { _id: req.body.response_id },
              { $pull: { _dislikes: { _user: req.user._id } } },
              (err, taskResponse) => callback(null, err, taskResponse))
          }
        ], function (err, result) {
          if (err) console.error(err)
          TaskResponse.findOne(
            { _id: req.body.response_id },
            (err, taskResponse) => {
              if (err) console.error(err)
              res.json(taskResponse)
            })
        })
      } else {
        res.status(401)
      }
    })
  // Dislike given task response
  app.put('/task/response/dislike',
    (req, res) => {
      if (req.isAuthenticated()) {
        async.waterfall([
          function (callback) {
            // Count user's dislikes
            TaskResponse.count({ _id: req.body.response_id, '_dislikes._user': req.user._id }, (err, result) => callback(null, result, err))
          },
          function (alreadyDisliked, previousErr, callback) {
            console.log('Already disliked - ', alreadyDisliked)
            if (alreadyDisliked) {
              // Remove dislike
              TaskResponse.findOneAndUpdate(
                { _id: req.body.response_id },
                { $pull: { _dislikes: { _user: req.user._id } } },
                (err, taskResponse) => callback(null, err, taskResponse))
            } else {
              // Dislike task response
              const dislike = {
                _user: req.user._id, // Current user is the disliker
                dislikedAt: new Date()
              }
              TaskResponse.findOneAndUpdate(
                { _id: req.body.response_id },
                { $push: { _dislikes: dislike } },
                (err, taskResponse) => callback(null, err, taskResponse))
            }
          },
          function (previousErr, previousResult, callback) {
            // Remove like
            TaskResponse.findOneAndUpdate(
              { _id: req.body.response_id },
              { $pull: { _likes: { _user: req.user._id } } },
              (err, taskResponse) => callback(null, err, taskResponse))
          }
        ], function (err, result) {
          if (err) console.error(err)
          TaskResponse.findOne(
            { _id: req.body.response_id },
            (err, taskResponse) => {
              if (err) console.error(err)
              res.json(taskResponse)
            })
        })
      } else {
        res.status(401)
      }
    })

  // Destroy task response
  app.post('/task/response/destroy',
    async (req, res) => {
      let taskresponse = await TaskResponse.findOne({ _id: req.body.id })

      const isModerator = _find(_get(req.user, '_permissions'), { type: 'moderator', instance: req.instance })
      const canDestroy = (isModerator || taskresponse._user._id === req.user._id)
      if (!canDestroy) return res.status(401)

      TaskResponse.findOneAndUpdate(
        { _id: req.body.id },
        { destroyed: new Date() },
        { upsert: true },
        (err, taskresponse) => {
          if (err) console.error(err)
          res.json({ taskresponse })
        })
    })
}
