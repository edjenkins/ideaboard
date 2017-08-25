const configAuth = require('../../config/auth')

const User = require('../../app/models/user')
const mail = require('../services/mail')

module.exports = function (app, passport) {

  app.post('/login',
    passport.authenticate('local-login'),
    (req, res) => {
      res.json({
        status: 'authenticated',
        user: {
          _id: req.user._id,
          created: req.user.created,
          profile: req.user.profile
        }
      })
    })

  app.post('/signup',
    passport.authenticate('local-signup'),
    (req, res) => {
      mail.sendMail(req.body.email, 'Howdy', 'welcome', { user: req.user })
      res.json({
        status: 'authenticated',
        user: {
          _id: req.user._id,
          created: req.user.created,
          profile: req.user.profile
        }
      })
    })

  app.get('/logout', (req, res) => {
    req.logout()
    res.json({
      status: 'unauthenticated',
      user: undefined
    })
  })

  app.post('/auth/forgot',
    (req, res) => {
      const resetCode = 'sduhsd'
      const resetLink = 'http://localhost:8080/reset/' + resetCode
      User.findOneAndUpdate({ 'local.email': req.body.email }, { code: resetCode }).exec((err, user) => {
        if (err) console.error(err)
        mail.sendMail(user.local.email, 'Forgotten Password', 'forgot', { user, resetLink })
        res.json({
          status: 'success'
        })
      })
    }
  )

  app.post('/auth/reset',
    (req, res) => {
      User.findOne({ code: req.body.code }).exec((err, user) => {
        if (err) console.error(err)
        user.code = undefined
        user.local.password = user.generateHash(req.body.password)
        user.save((saveErr) => {
          if (saveErr) { throw saveErr }
          res.json({
            status: 'success'
          })
        })
      })
    }
  )

  app.get('/auth/status', (req, res) => {
    if (req.isAuthenticated()) {
      res.json({
        status: 'authenticated',
        user: {
          _id: req.user._id,
          created: req.user.created,
          profile: req.user.profile
        }
      })
    } else {
      res.json({
        status: 'unauthenticated',
        user: undefined
      })
    }
  })

  // FACEBOOK ROUTES
  app.get('/auth/facebook/callback', function (req, res, next) {
    passport.authenticate('facebook', {
      successRedirect: (req.query.instance) ? `https://${req.query.instance}.eventspark.co.uk/profile` : 'https://eventspark.co.uk/profile',
      failureRedirect: (req.query.instance) ? `https://${req.query.instance}.eventspark.co.uk/join` : 'https://eventspark.co.uk/join'
    })
  });

  app.get('/auth/facebook/login/:instanceId', function (req, res, next) {
    passport.authenticate('facebook', { callbackURL: `${configAuth.facebookAuth.callbackURL}?instance=${req.params.instanceId}` })(req, res, next)
  });
}
