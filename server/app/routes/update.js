const Update = require('../../app/models/update')
const Idea = require('../../app/models/idea')
const mail = require('../../app/services/mail')

module.exports = function (app, passport) {
  // Get updates
  app.get('/idea/:idea_id/updates',
    (req, res) => {
      Idea.findOne({ _id: req.params.idea_id }).exec((err, idea) => {
        if (err) { return console.error(err) }
        res.json(idea._updates)
      })
    })
  // Post update
  app.post('/idea/:idea_id/update',
    (req, res) => {
      if (req.isAuthenticated()) {
        console.log(req.body)
        const data = {
          _user: req.user._id, // Current user is the update
          _idea: req.params.idea_id,
          text: req.body.text
        }
        // Create update
        const update = new Update(data)
        update.save((err, update) => {
          if (err) console.error(err)
          // res.json(update)
          Idea.findOneAndUpdate(
            { _id: req.params.idea_id },
            { $push: { _updates: update } },
            (err, idea) => {
              if (err) console.error(err)
              Update.findById(update._id).exec((err, update) => {
                if (err) console.error(err)
                // Send updates to subscribers
                mail.sendUpdate(idea, update)
                res.json(update)
              })
            })
        })
      } else {
        res.status(401)
      }
    })
}
