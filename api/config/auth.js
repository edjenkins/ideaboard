module.exports = {

  'facebookAuth': {
    'clientID': process.env.FB_CLIENT_ID,
    'clientSecret': process.env.FB_CLIENT_SECRET,
    'callbackURL': process.env.FB_CALLBACK_URL,
    'successRedirect': process.env.FB_SUCCESS_REDIRECT,
    'failureRedirect': process.env.FB_FAILURE_REDIRECT
  }

};
