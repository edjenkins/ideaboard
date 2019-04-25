const crypto = require('crypto')
const configAuth = require('../../config/auth')

const User = require('../../app/models/user')
const Notification = require('../../app/models/notification')

const mail = require('../services/mail')
const utilities = require('../../app/utilities')

const PROD_API_URL = 'https://api.ideaboard.co.uk'

module.exports = function (app, passport) {

  app.post('/auth/exists', async function (req, res, next) {

    // Get form params
    const email = req.body.email

    // Check if user exists..
    let errors = []

    // Find user
    const user = await User.findOne({
      'local.email': email
    })
    if (user) {
      res.json({
        exists: true
      })
    } else {
      res.json({
        exists: false
      })
    }
  })

  app.post('/consent', async function (req, res, next) {

    // Init errors array
    let errors = []

    // Check consent
    if (!(req.body.researchConsent && req.body.privacyConsent && req.body.termsConsent)) {
      errors.push({
        text: 'Please agree to the Research Policy, Privacy Policy and Terms of Use',
        type: 'error'
      })
    }

    // If there are issues with the signup throw them back
    if (errors.length > 0) {
      return res.json({
        errors: errors
      })
    } else {
      User.findOne({
        _id: req.user._id
      }).exec((err, user) => {
        if (err) console.error(err)
        user.consent = {
          research: Date.now(),
          privacy: Date.now(),
          terms: Date.now()
        }
        user.save((saveErr) => {
          if (saveErr) {
            throw saveErr
          }
          res.json({
            status: 'success'
          })
        })
      })

    }
  })

  app.post('/signup', async function (req, res, next) {

    // Get form params
    const email = req.body.email

    // Init errors array
    let errors = []

    // Find user
    const user = await User.findOne({
      'local.email': email
    })

    // User exists
    if (user) {

      if (user.validPassword(req.body.password)) {
        passport.authenticate('local-login')(req, res, function () {
          return res.json({
            success: true
          })
        })
      } else {
        errors.push({
          text: 'Email taken / Password incorrect',
          type: 'error'
        })
        return res.json({
          errors: errors
        })
      }
    } else {
      // Check name exists
      if (!req.body.name || req.body.name.length < 3) {
        errors.push({
          text: 'Name should be longer than 3 characters',
          type: 'error'
        })
      }

      // Check password is valid
      if (!req.body.password || req.body.password.length < 8) {
        errors.push({
          text: 'Password should be longer than 8 characters',
          type: 'error'
        })
      }

      // Check consent
      if (!(req.body.researchConsent && req.body.privacyConsent && req.body.termsConsent)) {
        errors.push({
          text: 'Please agree to the Research Policy, Privacy Policy and Terms of Use',
          type: 'error'
        })
      }

      // If there are issues with the signup throw them back
      if (errors.length > 0) {
        return res.json({
          errors: errors
        })
      } else {
        // Create the account and authenticate the user
        passport.authenticate('local-signup', function (err, user) {
          passport.authenticate('local-login')(req, res, function () {
            return res.json({
              success: true
            })
          })
        })(req, res, next)
      }
    }
  })

  app.post('/demvr-signup', async function (req, res, next) {

    // Get form params
    const email = req.body.email

    // Init errors array
    let errors = []

    // Find user
    const user = await User.findOne({
      'local.email': email
    })

    // User exists
    if (user) {
      mail.sendMail(user.local.email, `Welcome to DemVR - Ideaboard`, `welcome-demvr`, {
        user: user,
        url: utilities.redirectUri('demvr')
      }, `"James Hodge" <j.hodge1@newcastle.ac.uk>`)

      return res.json({
        success: true
      })

    } else {
      // Check name exists
      if (req.body.name.length < 3) {
        errors.push({
          text: 'Name should be longer than 3 characters',
          type: 'error'
        })
      }

      // Check consent
      if (!(req.body.researchConsent && req.body.privacyConsent && req.body.termsConsent)) {
        errors.push({
          text: 'Please agree to the Research Policy, Privacy Policy and Terms of Use',
          type: 'error'
        })
      }

      req.body.password = "";
      let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

      for (var i = 0; i < 8; i++)
        req.body.password += possible.charAt(Math.floor(Math.random() * possible.length));

      // If there are issues with the signup throw them back
      if (errors.length > 0) {
        return res.json({
          errors: errors
        })
      } else {
        // Create the account and authenticate the user
        passport.authenticate('local-signup', function (err, user) {
          crypto.pseudoRandomBytes(16, function (err, raw) {
            if (err) console.error(err)
            const resetCode = raw.toString('hex')
            let resetLink = `${utilities.redirectUri('demvr')}/reset/${resetCode}`
            User.findOneAndUpdate({
              'local.email': req.body.email.toLowerCase()
            }, {
              code: resetCode
            }).exec((err, user) => {
              if (err) console.error(err)
              if (!user) {
                return res.json({
                  errors: [{
                    type: 'error',
                    text: 'User not found!'
                  }]
                })
              }
              mail.sendMail(user.local.email, `Welcome to DemVR - Ideaboard`, `new-user-demvr`, {
                user: user,
                resetLink: resetLink,
                url: utilities.redirectUri('demvr')
              }, `"James Hodge" <j.hodge1@newcastle.ac.uk>`)
              res.json({
                status: 'success'
              })
            })
          })
        })(req, res, next)
      }
    }
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
        User.findOneAndUpdate({
          'local.email': req.body.email.toLowerCase()
        }, {
          code: resetCode
        }).exec((err, user) => {
          if (err) console.error(err)
          if (!user) {
            return res.json({
              errors: [{
                type: 'error',
                text: 'User not found!'
              }]
            })
          }
          mail.sendMail(user.local.email, 'Forgotten Password', 'forgot', {
            user: user,
            resetLink: resetLink,
            url: utilities.redirectUri(req.instance)
          })
          res.json({
            status: 'success'
          })
        })
      })
    }
  )

  app.post('/auth/reset',
    (req, res) => {
      User.findOne({
        code: req.body.code
      }).exec((err, user) => {
        try {
          if (err) console.error(err)
          if (!user) throw new Error('User does not exist')
          user.code = undefined
          user.local.password = user.generateHash(req.body.password)
          user.save((saveErr) => {
            if (saveErr) {
              throw saveErr
            }
            res.json({
              status: 'success'
            })
          })
        } catch (err) {
          console.error(err)
        }
      })
    }
  )

  app.get('/auth/status', (req, res) => {
    if (req.isAuthenticated()) {
      User.findOne({
        _id: req.user._id
      }).exec((err, user) => {
        res.json({
          status: 'authenticated',
          user: {
            _id: req.user._id,
            created: req.user.created,
            profile: req.user.profile,
            permissions: user._permissions,
            consented: user.consent.research && user.consent.privacy && user.consent.terms
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
    passport.authenticate('facebook', {
      callbackURL: `${PROD_API_URL}/auth/facebook/callback/${req.params.instance}`
    })(req, res, next);
  });

  app.get('/auth/facebook/callback/:instance', function (req, res, next) {
    passport.authenticate('facebook', {
      callbackURL: `${PROD_API_URL}/auth/facebook/callback/${req.params.instance}`,
      successRedirect: `${utilities.redirectUri(req.params.instance)}/profile`,
      failureRedirect: `${utilities.redirectUri(req.params.instance)}/auth`
    })(req, res, next);
  });
}
