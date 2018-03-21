const _filter = require('lodash/filter')
const User = require('../../app/models/user')
const Idea = require('../../app/models/idea')

module.exports = function (app, passport) {
  app.get('/user/search/:query',
    (req, res) => {
      console.log(req.params.id)
      if (req.isAuthenticated()) {
        User.findOne({ _id: { $ne: req.user._id }, $text: { $search: req.params.query } }).select('profile.name').exec((err, user) => {
          if (err) return console.error(err)
          console.log(user)
          res.json(user)
        })
      } else {
        res.status(401)
      }
    })
  app.get('/user/:id',
    (req, res) => {
      console.log(req.params.id)
      if (req.isAuthenticated()) {
        User.findOne({ _id: req.params.id }).exec((err, user) => {
          if (err) return console.error(err)
          console.log(user)
          user._permissions = _filter(user._permissions, { instance: req.instance })
          res.json({
            _id: user._id,
            profile: user.profile,
            permissions: user._permissions
          })
        })
      } else {
        res.status(401)
      }
    })
  app.get('/user/:id/ideas',
    (req, res) => {
      if (req.isAuthenticated()) {
        Idea.find({ _user: req.params.id, instance: req.instance }).exec((err, ideas) => {
          if (err) return console.error(err)
          res.json(ideas)
        })
      } else {
        res.status(401)
      }
    })
  app.put('/user',
    (req, res) => {
      if (req.isAuthenticated()) {
        if (req.body.profile.avatar && req.body.profile.avatar.location) {
          req.body.profile.avatar = req.body.profile.avatar.location
        }
        User.findOneAndUpdate(
          { _id: req.user._id },
          { profile: req.body.profile },
          { upsert: true },
          (err, user) => {
            if (err) console.error(err)
            User.findOne({ _id: user._id }, (err, user) => {
              if (err) console.error(err)
              res.json({ profile: user.profile })
            })
          })
      } else {
        res.status(401)
      }
    })
}
