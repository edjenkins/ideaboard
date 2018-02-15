const async = require('async')

const Notification = require('../../app/models/notification')

const mail = require('../../app/services/mail')
const _ = require('lodash')

module.exports = function (app, passport) {
  // Get notifications
  app.get('/notifications',
    (req, res) => {
      Notification.find({ _user: req.user }).exec((err, notifications) => {
        if (err) { return console.error(err) }
        res.json({
          unread: _.filter(notifications, { status: 'unread' }),
          read: _.chain(notifications).filter({ status: 'read' }).take(3),
          deleted: _.chain(notifications).filter({ status: 'deleted' }).take(3)
        })
      })
    })
  // Get notification
  app.get('/notification/:id',
    (req, res) => {
      async.series({
        notification: function (callback) {
          notification.findOne({ _id: req.params.id }).exec(callback)
        }
      }, function (err, results) {
        if (err) console.error(err)
        res.json({ notification: results.notification })
      })
    })
  // Update notification
  app.put('/notification',
    (req, res) => {
      if (req.isAuthenticated()) {
        Notification.findOneAndUpdate(
          { _id: req.body._id },
          { status: req.body.status },
          (err, notification) => {
            if (err) console.error(err)
            res.json({ notification })
          })
      } else {
        res.status(401)
      }
    })
}
