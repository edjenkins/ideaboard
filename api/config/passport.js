const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../app/models/user')

const configAuth = require('./auth')

module.exports = function (passport) {
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user)
    })
  })

  // Signup
  passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
    (req, email, password, done) => {
      User.findOne({ 'local.email': email }, (err, user) => {
        if (err) { return done(err) }
        if (user) { return done(null, false, 'That email is already taken.') }

        const newUser = new User()
        newUser.profile.name = req.body.name
        newUser.local.email = email
        newUser.local.password = newUser.generateHash(password)

        newUser.save((saveErr) => {
          if (saveErr) { throw saveErr }
          return done(null, newUser)
        })
      })
    }))

  // Login
  passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
    (req, email, password, done) => {
      User.findOne({ 'local.email': email }, (err, user) => {
        if (err) { return done(null, false) }
        if (!user) { return done(null, false, 'No user found.') }
        if (!user.validPassword(password)) { return done(null, false, 'Oops! Wrong password.') }

        return done(null, user)
      })
    }))


  // FACEBOOK ROUTES
  passport.use(new FacebookStrategy({

    clientID: configAuth.facebookAuth.clientID,
    clientSecret: configAuth.facebookAuth.clientSecret,
    callbackURL: (req.params.instanceId) ? `https://${req.params.instanceId}.eventspark.co.uk/${configAuth.facebookAuth.callbackURL}` : `https://eventspark.co.uk/${configAuth.facebookAuth.callbackURL}`,
    profileFields: ['id', 'email', 'name', 'timezone', 'updated_time'] // 'gender', 'link', 'locale', 'verified'
  },

    function (req, token, refreshToken, profile, done) {

      process.nextTick(function () {

        User.findOne({ 'facebook.id': profile.id }, function (err, user) {

          if (err)
            return done(err)

          console.log(profile)
          console.log(token)

          if (user) {
            return done(null, user)
          } else {
            var newUser = new User()

            newUser.facebook.id = profile.id
            newUser.facebook.token = token
            newUser.facebook.name = profile.name.givenName + ' ' + profile.name.familyName
            newUser.facebook.email = profile.emails[0].value

            // Update user profile
            newUser.profile.name = newUser.facebook.name

            newUser.save(function (err) {
              if (err)
                throw err;

              return done(null, newUser)
            })
          }
        })
      })
    }))
}
