const async = require('async')

const Document = require('../../app/models/document')

module.exports = function (app, passport) {
  // Get documents
  app.get('/documents/:idea_id',
    async (req, res) => {
      const document = await Document.findOne({ _idea: req.params.idea_id })
      return res.json(document)
    })
  // Get document
  app.get('/document/:id',
    (req, res) => {
      Document.find({ _id: req.params.id }).exec((err, document) => {
        if (err) { return console.error(err) }
        res.json(document)
      })
    })
  // Post document
  app.post('/document',
    (req, res) => {
      if (req.isAuthenticated()) {
        console.log(req.body)
        console.log('req.user._id')
        console.log(req.user._id)
        
        //, _user: req.user._id
        Document.findOneAndUpdate(
          { _id: req.body._id },
          {
            text: req.body.text,
            _user: req.user._id
          },
          { upsert: true },
          (err, document) => {
            if (err) console.error(err)
            res.json(document)
          })
        }
    })
}
