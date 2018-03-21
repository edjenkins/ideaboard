const async = require('async')

const Document = require('../../app/models/document')

module.exports = function (app, passport) {
  // Get documents
  app.get('/documents/:idea_id',
    async (req, res) => {
      const documents = await Document.find({ _idea: req.params.idea_id })
      
      if (documents.length === 0) {
        // No documents - create one
        const data = {
          _idea: req.params.idea_id
        }
        const document = new Document(data)
        document.save().then((document) => {
          if (err) console.error(err)
          return res.json([document])
        })
      } else {
        return res.json(documents)
      }
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
        Document.findOneAndUpdate(
          { _id: req.body._id, _user: req.user._id },
          { text: req.body.text },
          { upsert: true },
          (err, document) => {
            if (err) console.error(err)
            res.json(document)
          })
        }
    })
}
