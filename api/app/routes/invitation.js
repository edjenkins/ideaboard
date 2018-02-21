const async = require('async')

const Invitation = require('../../app/models/invitation')
const Notification = require('../../app/models/notification')
const Permission = require('../../app/models/permission')

const mail = require('../../app/services/mail')
const utilities = require('../../app/utilities')

const _chain = require('lodash/chain')

module.exports = function (app, passport) {
  // Get invitations
  app.get('/invitations',
    (req, res) => {
      Invitation.find({ }).exec((err, invitations) => {
        if (err) { return console.error(err) }
        res.json({
          accepted: _chain(invitations).filter({ status: 'accepted' }).take(5),
          cancelled: _chain(invitations).filter({ status: 'cancelled' }).take(5),
          pending: _chain(invitations).filter({ status: 'pending' }).take(5),
          declined: _chain(invitations).filter({ status: 'declined' }).take(5)
        })
      })
    })
  // Get invitation
  app.get('/invitation/:id',
    (req, res) => {
      async.series({
        invitation: function (callback) {
          Invitation.findOne({ _id: req.params.id }).exec(callback)
        }
      }, function (err, results) {
        if (err) console.error(err)
        res.json({ invitation: results.invitation })
      })
    })
  // Create invitation
  app.post('/invitation',
    (req, res) => {
      if (req.isAuthenticated()) {

        // Create notification
        const notification = new Notification({
          _user: req.user._id,
          type: 'invitation',
          text: 'You sent an invitation to ' + req.body.recipient,
          instance: req.instance
        })

        notification.save((err, invitation) => {
          if (err) console.error(err)
          mail.sendMail(req.body.recipient, 'Invitation', 'invitation', { user: req.user, recipient: req.body.recipient, url: utilities.redirectUri(req.instance) })
          res.json({ msg: 'done' })
        })
      } else {
        res.status(401)
      }
    })
}
