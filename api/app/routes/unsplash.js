var unsplash = require('unsplash-api')

var clientId = '72c865e123b1733c26f17d1e7d50a8809f3aec74bda8530a234351f268623b71'
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
