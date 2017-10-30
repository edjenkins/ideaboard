
const User = require('../../app/models/user')
const Idea = require('../../app/models/idea')

module.exports = function (app, passport) {
  app.get('/user/:id',
    (req, res) => {
      console.log(req.params.id)
      if (req.isAuthenticated()) {
        User.findOne({ _id: req.params.id }).exec((err, user) => {
          if (err) return console.error(err)
          console.log(user)
          res.json({
            _id: user._id,
            profile: user.profile
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
        console.log(req.body)
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
