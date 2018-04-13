const configAWS = require('../../config/aws.js')

var fetchUrl = require('fetch').fetchUrl

const _get = require('lodash/get')
const _find = require('lodash/find')

const async = require('async')
const aws = require('aws-sdk')
const crypto = require('crypto')

const s3 = new aws.S3({
  accessKeyId: configAWS.accessKeyId,
  secretAccessKey: configAWS.secretAccessKey,
  region: configAWS.s3Region
})

const S3_DIR = configAWS.s3Dir
const S3_BUCKET = configAWS.s3Bucket

const Idea = require('../../app/models/idea')
const Document = require('../../app/models/document')
const config = require('../../config')
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
  // Destroy idea
  app.post('/idea/destroy',
    (req, res) => {
      if (!req.isAuthenticated()) return res.status(401)

      const isAdmin = _find(_get(req.user, '_permissions'), { type: 'admin', instance: req.instance })
      if (!isAdmin) return res.status(401)
      
      Idea.findOneAndUpdate(
        { _id: req.body.id },
        { destroyed: new Date() },
        { upsert: true },
        (err, idea) => {
          res.json({ idea: idea })
        })
    })
  // Start idea
  app.post('/idea',
    async (req, res) => {
      if (!req.isAuthenticated()) return res.status(401)

      let data = req.body
      data.idea._user = req.user._id

      let errors = []

      // Check title length
      if (!data.idea.title || data.idea.title.length < 3 || data.idea.title.length > 30) {
        errors.push({
          text: 'Idea title should be longer than 3 and less than 30 characters',
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

      // Set banner
      if (data.idea.banner) {
        data.idea.banner = (data.uploadType === 'unsplash') ? data.idea.banner : data.idea.banner.location
      }

      // Create idea
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
              console.log(data)
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
        let updatedIdea = await idea.save()
        console.log(updatedIdea)

        // Set children of parent idea
        if (typeof idea._parent !== 'undefined') {
          let parentIdea = await Idea.findOne(idea._parent)
          console.log(parentIdea)
          parentIdea._children.push(idea._id)
          let updatedParentIdea = await parentIdea.save()
          console.log(updatedParentIdea)
        }

        // Create outcome document
        const documentText = _get(config.instances[idea.instance], 'document', '')
        const document = new Document({ _idea: idea._id, _user: req.user._id, text: documentText })
        const outcomeDocument = await document.save()

        console.log(outcomeDocument)

        mail.sendMail(req.user.local.email, 'Idea Created', 'idea-created', { user: req.user, idea: idea })
        res.json({ idea })
      }
    })
  // Update idea
  app.put('/idea',
    async (req, res) => {
      if (!req.isAuthenticated()) return res.status(401)

      let idea = await Idea.findOne({ _id: req.body.id })

      const isModerator = _find(_get(req.user, '_permissions'), { type: 'moderator', instance: req.instance })
      const canEdit = (isModerator || idea._user._id.toString() === req.user._id.toString())
      if (!canEdit) return res.status(401)
      
      idea = await Idea.findOneAndUpdate({ _id: req.body._id, instance: req.instance }, req.body)
      console.log(idea)
      idea = await Idea.findOne({ _id: req.body._id })
      res.json({ idea })
    })
  // Subscribe authenticated user to idea
  app.put('/idea/subscribe',
    (req, res) => {
      if (!req.isAuthenticated()) return res.status(401)

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
    })
  // Unsubscribe authenticated user from idea
  app.put('/idea/unsubscribe',
    (req, res) => {
      if (!req.isAuthenticated()) return res.status(401)

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
    })
}
