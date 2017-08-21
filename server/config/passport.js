const LocalStrategy = require('passport-local').Strategy
const User = require('../app/models/user')

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
}
