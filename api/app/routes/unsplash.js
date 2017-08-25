var unsplash = require('unsplash-api')

var clientId = process.env.UNSPLASH_CLIENT_ID
unsplash.init(clientId)

module.exports = function (app, passport) {
  // Search unsplash
  app.get('/unsplash/search/:query',
    (req, res) => {
      // query, categories, page, perPage, callback
      unsplash.searchPhotos(req.params.query, undefined, undefined, 12, (error, photos, link) => {
        res.json(photos)
      })
    })
}
