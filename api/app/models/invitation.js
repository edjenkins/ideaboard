const mongoose = require('mongoose')

const invitationSchema = mongoose.Schema({

  _user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  recipient: String,
  type: String,
  meta: Object,
  instance: String,
  status: { type: String, default: 'pending' },
  created: Date

})

invitationSchema.pre('save', function (next) {
  if (!this.created) this.created = new Date()
  next()
})

module.exports = mongoose.model('Invitation', invitationSchema)
