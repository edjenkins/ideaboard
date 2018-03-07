const async = require('async')

const Category = require('../../app/models/category')

const utilities = require('../../app/utilities')

module.exports = function (app, passport) {
  // Get categories
  app.get('/categories',
    (req, res) => {
      console.log(req.instance)
      Category.find({ instance: req.instance }).exec((err, categories) => {
        if (err) { return console.error(err) }
        res.json(categories)
      })
    })
  // Get category
  app.get('/category/:id',
    (req, res) => {
      async.series({
        category: function (callback) {
          Category.findOne({ _id: req.params.id }).exec(callback)
        }
      }, function (err, results) {
        if (err) console.error(err)
        res.json({ category: results.category })
      })
    })
  // Create category
  app.post('/category',
    (req, res) => {
      if (req.isAuthenticated()) {
        
        let data = req.body
        
        // Set instance
        data.category.instance = req.instance

        data.category._user = req.user._id
        const category = new Category(data.category)

        category.save((err) => {
          if (err) console.error(err)
          // mail.sendMail(req.user.local.email, 'Category Created', 'category-created', { user: req.user, category: category, url: utilities.redirectUri(req.instance) })
          res.json({ category })
        })
      } else {
        res.status(401)
      }
    })
  // Update category
  app.put('/category',
    (req, res) => {
      if (req.isAuthenticated()) {
        Category.findOneAndUpdate(
          { _id: req.body._id },
          req.body, (err, category) => {
            if (err) console.error(err)
            res.json({ category })
          })
      } else {
        res.status(401)
      }
    })
}
