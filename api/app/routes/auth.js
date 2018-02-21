const crypto = require('crypto')
const configAuth = require('../../config/auth')

const User = require('../../app/models/user')
const Notification = require('../../app/models/notification')

const mail = require('../services/mail')
const utilities = require('../../app/utilities')

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

  app.post('/signup', function (req, res, next) {

    // Get form params
    const email = req.body.email

    // Check if user exists..
    let errors = []

    // Check name exists
    if (req.body.name.length < 3) {
      errors.push({
        text: 'Name should be longer than 3 characters',
        type: 'error'
      })
    }

    // Check password is valid
    if (req.body.password.length < 8) {
      errors.push({
        text: 'Password should be longer than 8 characters',
        type: 'error'
      })
    }

    User.findOne({ 'local.email': email }, (err, user) => {
      if (err) { return done(err) }
      if (user) {
        errors.push({
          text: 'That email has already been taken',
          type: 'error'
        })
      }
      // If there are issues with the signup throw them back
      if (errors.length > 0) {
        return res.json({
          errors: errors
        })
      }
      
      // Create the account and authenticate the user
      passport.authenticate('local-signup', function(err, user) {
        passport.authenticate('local-login')(req, res, function() {
          return res.json({
            success: true
          })
        })
      })(req, res, next)
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
      crypto.pseudoRandomBytes(16, function (err, raw) {
        if (err) console.error(err)
        const resetCode = raw.toString('hex')
        let resetLink = `${utilities.redirectUri(req.instance)}/reset/${resetCode}`
        User.findOneAndUpdate({ 'local.email': req.body.email.toLowerCase() }, { code: resetCode }).exec((err, user) => {
          if (err) console.error(err)
          if (!user) {
            return res.json({
              errors: [
                { type: 'error', text: 'User not found!' }
              ]
            })
          }
          mail.sendMail(user.local.email, 'Forgotten Password', 'forgot', { user: user, resetLink: resetLink, url: utilities.redirectUri(req.instance) })
          res.json({
            status: 'success'
          })
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
      User.findOne({ _id: req.user._id }).exec((err, user) => {
        res.json({
          status: 'authenticated',
          user: {
            _id: req.user._id,
            created: req.user.created,
            profile: req.user.profile,
            permissions: user._permissions
          }
        })
      })
    } else {
      res.json({
        status: 'unauthenticated',
        user: undefined
      })
    }
  })

  // FACEBOOK ROUTES

  app.get('/auth/facebook/login/:instance', function (req, res, next) {
    passport.authenticate('facebook', { callbackURL: `${PROD_API_URL}/auth/facebook/callback/${req.instance}` })(req, res, next);
  });

  app.get('/auth/facebook/callback/:instance', function (req, res, next) {
    passport.authenticate('facebook', {
      callbackURL: `${PROD_API_URL}/auth/facebook/callback/${req.instance}`,
      successRedirect: `${utilities.redirectUri(req.instance)}/profile`,
      failureRedirect: `${utilities.redirectUri(req.instance)}/auth`
    })(req, res, next);
  });
}
