const configS3 = require('../../config/s3.js')

var fetchUrl = require('fetch').fetchUrl

const async = require('async')
const aws = require('aws-sdk')
const crypto = require('crypto')

const s3 = new aws.S3({
  accessKeyId: configS3.accessKeyId,
  secretAccessKey: configS3.secretAccessKey
})

const S3_DIR = configS3.dir
const S3_BUCKET = configS3.bucket

const Idea = require('../../app/models/idea')
const mail = require('../../app/services/mail')

module.exports = function (app, passport) {
  // Get ideas
  app.get('/ideas',
    (req, res) => {
      Idea.find({ instance: req.instance }).exec((err, ideas) => {
        if (err) { return console.error(err) }
        res.json(ideas)
      })
    })
  // Get idea
  app.get('/idea/:id',
    (req, res) => {
      async.series({
        idea: function (callback) {
          Idea.findOne({ _id: req.params.id }).exec(callback)
        }
      }, function (err, results) {
        if (err) console.error(err)
        res.json({ idea: results.idea })
      })
    })
  // Create idea
  app.post('/idea',
    (req, res) => {
      if (req.isAuthenticated()) {
        let data = req.body
        data.idea._user = req.user._id
        
        // Set instance
        data.idea.instance = req.instance

        const idea = new Idea(data.idea)

        if (data.uploadType === 'unsplash') {
          // Upload unsplash image
          fetchUrl(data.idea.banner, function (error, meta, body) {
            if (error) console.error(error)
            crypto.pseudoRandomBytes(16, function (err, raw) {
              if (err) console.error(err)
              const key = S3_DIR + '/' + raw.toString('hex') + Date.now() + '.' + 'jpeg'
              s3.upload({
                Bucket: S3_BUCKET,
                Key: key,
                Body: body,
                ACL: 'public-read'
              }, function (err, data) {
                if (err) console.error(err, err.stack)
                idea.banner = data.Location
                idea.save((err) => {
                  if (err) console.error(err)
                  mail.sendMail(req.user.local.email, 'Idea Created', 'idea-created', { user: req.user, idea: idea })
                  res.json({ idea })
                })
              })
            })
          })
        } else {
          idea.save((err) => {
            if (err) console.error(err)
            mail.sendMail(req.user.local.email, 'Idea Created', 'idea-created', { user: req.user, idea: idea })
            res.json({ idea })
          })
        }
      } else {
        res.status(401)
      }
    })
  // Update idea
  app.put('/idea',
    (req, res) => {
      if (req.isAuthenticated()) {
        Idea.findOneAndUpdate(
          { _id: req.body._id },
          req.body, (err, idea) => {
            if (err) console.error(err)
            res.json({ idea })
          })
      } else {
        res.status(401)
      }
    })
  // Subscribe authenticated user to idea
  app.put('/idea/subscribe',
    (req, res) => {
      if (req.isAuthenticated()) {
        async.waterfall([
          function (callback) {
            Idea.count({ _id: req.body.idea_id, '_subscribers._user': req.user._id }, (err, result) => {
              callback(null, result, err)
            })
          },
          function (alreadySubscribed, previousErr, callback) {
            console.log('Already subscribed - ', alreadySubscribed)
            if (alreadySubscribed) {
              callback(null, null, null)
            } else {
              // Subscribe user
              const subscriber = {
                _user: req.user._id, // Current user is the subscriber
                subscribedAt: new Date()
              }
              Idea.findOneAndUpdate(
                { _id: req.body.idea_id },
                { $push: { _subscribers: subscriber } },
                (err, idea) => {
                  mail.sendMail(req.user.local.email, 'You Subscribed', 'subscribed', { user: req.user, idea: idea })
                  callback(null, err, idea)
                })
            }
          }
        ], function (err, result) {
          // result now equals 'done'
          if (err) console.error(err)
          Idea.findOne(
            { _id: req.body.idea_id },
            (err, idea) => {
              if (err) console.error(err)
              res.json({ idea })
            })
        })
      } else {
        res.status(401)
      }
    })
  // Unsubscribe authenticated user from idea
  app.put('/idea/unsubscribe',
    (req, res) => {
      if (req.isAuthenticated()) {
        Idea.findOneAndUpdate(
          { _id: req.body.idea_id },
          { $pull: { _subscribers: { _user: req.user._id } } },
          (err, idea) => {
            if (err) console.error(err)
            Idea.findOne(
              { _id: req.body.idea_id },
              (err, idea) => {
                if (err) console.error(err)
                res.json({ idea })
              })
          })
      } else {
        res.status(401)
      }
    })
}
