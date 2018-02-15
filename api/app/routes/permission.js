
const async = require('async')
const Permission = require('../../app/models/permission')
const Notification = require('../../app/models/notification')
const User = require('../../app/models/user')
const _ = require('lodash')
const mail = require('../../app/services/mail')

module.exports = function (app, passport) {
  app.get('/permissions',
    (req, res) => {
      // TODO: Check if admin
      const instance = (req.instance.indexOf('localhost') !== -1) ? 'default' : req.instance
      console.log(instance)
      
      async.series({
        permissions: function (callback) {
          Permission.find({ instance: instance }).exec(callback)
        },
        users: function (callback) {
          User.find({ _id: { $ne: req.user._id } }).exec((err, users) => {
            const filtered = _.filter(users, (user) => {
              return user._permissions.length > 0
            })
            callback(null, filtered)
          })
        }
      }, function (err, results) {
        if (err) console.error(err)
        res.json({ permissions: results.permissions, users: results.users })
      })
    })
  // Update user permissions
  app.put('/permissions',
    (req, res) => {
      if (req.isAuthenticated()) {
        console.log('req.body.userId')
        console.log(req.body.userId)
        User.findOne(
          { $and: [ { _id: req.body.userId }, { _id: { $ne: req.user._id } } ] },
          (err, user) => {
            if (err) console.error(err)
            console.log('user._id')
            console.log(user._id)
            user._permissions = []
            _.forEach(req.body.permissions, (value, key) => {
              if (value) {
                user._permissions.push(key)
              }
            });
            user.save((err, user) => {

              // Create notification
              const notification = new Notification({
                _user: req.body.userId,
                type: 'permissions',
                text: 'Your permissions have been updated by ' + req.user.profile.name,
                instance: req.instance
              })

              notification.save((err, invitation) => {
                if (err) console.error(err)
                mail.sendMail(user.local.email, 'Permissions Updated', 'permissions', { user: req.user, recipient: user })
                res.json({ msg: 'done' })
              })
            })
          })

      } else {
        res.status(401)
      }
    })
}