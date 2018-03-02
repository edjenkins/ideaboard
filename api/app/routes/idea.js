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
const utilities = require('../../app/utilities')

module.exports = function (app, passport) {
  // Get ideas
  app.get('/ideas/:categoryId?',
    (req, res) => {
      const query = (req.params.categoryId === 'undefined') ? { instance: req.instance } : { instance: req.instance, _categories: req.params.categoryId }
      Idea.find(query).exec((err, ideas) => {
        if (err) { return console.error(err) }
        res.json(ideas)
      })
    })
  // Get idea
  app.get('/idea/:id',
    (req, res) => {
      async.series({
        idea: function (callback) {
          Idea.findOne({ _id: req.params.id, instance: req.instance }).exec(callback)
        }
      }, function (err, results) {
        if (err) console.error(err)
        res.json({ idea: results.idea })
      })
    })
  // Start idea
  app.post('/idea',
    (req, res) => {
      if (req.isAuthenticated()) {
        let data = req.body
        data.idea._user = req.user._id

        let errors = []

        // Check title length
        if (!data.idea.title || data.idea.title.length < 3 || data.idea.title.length > 20) {
          errors.push({
            text: 'Idea title should be longer than 3 and less than 20 characters',
            type: 'error'
          })
        }

        // Check tagline is valid
        if (!data.idea.tagline || data.idea.tagline.length < 8 || data.idea.tagline.length > 240) {
          errors.push({
            text: 'Idea tagline should be longer than 10 and less than 240 characters',
            type: 'error'
          })
        }

        // Check description is valid
        if (!data.idea.description || data.idea.description.length < 8 || data.idea.description.length > 10000) {
          errors.push({
            text: 'Idea description should be longer than 10 and less than 10,000 characters',
            type: 'error'
          })
        }

        if (errors.length > 0) {
          return res.json({
            errors: errors
          })
        }
        
        // Set instance
        data.idea.instance = req.instance

        const idea = new Idea(data.idea)
        
        // Set category
        if (typeof data.idea.category !== 'undefined') {
          idea._categories.push(data.idea.category)
        }

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
                  mail.sendMail(req.user.local.email, 'Idea Created', 'idea-created', { user: req.user, idea: idea, url: utilities.redirectUri(req.instance) })
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
          { _id: req.body._id, instance: req.instance },
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
            Idea.count({ _id: req.body.idea_id, instance: req.instance, '_subscribers._user': req.user._id }, (err, result) => {
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
                { _id: req.body.idea_id, instance: req.instance },
                { $push: { _subscribers: subscriber } },
                (err, idea) => {
                  mail.sendMail(req.user.local.email, 'You Subscribed', 'subscribed', { user: req.user, idea: idea, url: utilities.redirectUri(req.instance) })
                  callback(null, err, idea)
                })
            }
          }
        ], function (err, result) {
          // result now equals 'done'
          if (err) console.error(err)
          Idea.findOne(
            { _id: req.body.idea_id, instance: req.instance },
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
          { _id: req.body.idea_id, instance: req.instance },
          { $pull: { _subscribers: { _user: req.user._id } } },
          (err, idea) => {
            if (err) console.error(err)
            Idea.findOne(
              { _id: req.body.idea_id, instance: req.instance },
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
