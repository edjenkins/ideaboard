const mongoose = require('mongoose')

const reportSchema = mongoose.Schema({

  _user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  _target: mongoose.Schema.Types.ObjectId,
  type: String,
  text: String,
  created: Date

})

reportSchema.pre('save', function (next) {
  if (!this.created) this.created = new Date()
  next()
})

reportSchema.pre('findOne', function (next) {
  next()
})

reportSchema.pre('find', function (next) {
  next()
})

module.exports = mongoose.model('Report', reportSchema)
