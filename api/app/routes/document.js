const async = require('async')
const _get = require('lodash/get')

const config = require('../../config.js')
const Document = require('../../app/models/document')
const Idea = require('../../app/models/idea')

module.exports = function (app, passport) {
  // Get documents
  app.get('/documents/:idea_id',
    async (req, res) => {
      // Find existing outcome document
      let document = await Document.findOne({ _idea: req.params.idea_id })
      
      // If no existing document found - create one
      if (!document) {
        const idea = await Idea.findOne({ _id: req.params.idea_id })
        const documentText = _get(config.instances[idea.instance], 'document', '')
        const newDocument = new Document({ _idea: idea._id, _user: idea._user, text: documentText })
        document = await newDocument.save()
      }
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
