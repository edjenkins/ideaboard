// var unsplash = require('unsplash-api')
const axios = require('axios');

module.exports = function (app, passport) {
  // Search unsplash
  app.get('/unsplash/search/:query',
    (req, res) => {
      axios.get('https://api.unsplash.com/search/photos', { params: { 'query': req.params.query, 'client_id': process.env.UNSPLASH_CLIENT_ID } })
      .then(response => {
          // Your code
          if (response.data) res.send(response.data.results)
          else res.json([])
      }).catch(function (error) {
        console.log(error);
      });
    })
}
