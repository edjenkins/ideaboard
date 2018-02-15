const mongoose = require('mongoose')

const notificationSchema = mongoose.Schema({

  _user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  _invitation: { type: mongoose.Schema.Types.ObjectId, ref: 'Invitation' },
  type: String,
  text: String,
  instance: String,
  status: { type: String, default: 'unread' },
  created: Date

})

notificationSchema.pre('save', function (next) {
  if (!this.created) this.created = new Date()
  next()
})


notificationSchema.pre('find', function (next) {
  this.populate('_invitation')
  next()
})

module.exports = mongoose.model('Notification', notificationSchema)
