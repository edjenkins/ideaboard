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

    // pull in our app id and secret from our auth.js file
    clientID: configAuth.facebookAuth.clientID,
    clientSecret: configAuth.facebookAuth.clientSecret,
    callbackURL: configAuth.facebookAuth.callbackURL,
    profileFields: ['id', 'email', 'gender', 'link', 'locale', 'name', 'timezone', 'updated_time', 'verified']

  },

    // facebook will send back the token and profile
    function (token, refreshToken, profile, done) {

      // asynchronous
      process.nextTick(function () {

        // find the user in the database based on their facebook id
        User.findOne({ 'facebook.id': profile.id }, function (err, user) {

          // if there is an error, stop everything and return that
          // ie an error connecting to the database
          if (err)
            return done(err);

          console.log(profile)

          // if the user is found, then log them in
          if (user) {
            return done(null, user); // user found, return that user
          } else {
            // if there is no user found with that facebook id, create them
            var newUser = new User();

            // set all of the facebook information in our user model
            newUser.facebook.id = profile.id; // set the users facebook id                   
            newUser.facebook.token = token; // we will save the token that facebook provides to the user                    
            newUser.facebook.name = profile.name.givenName + ' ' + profile.name.familyName; // look at the passport user profile to see how names are returned
            newUser.facebook.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first

            // save our user to the database
            newUser.save(function (err) {
              if (err)
                throw err;

              // if successful, return the new user
              return done(null, newUser);
            });
          }

        });
      });

    }));
}
