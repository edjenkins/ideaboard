const mongoose = require('mongoose')

const updateSchema = mongoose.Schema({

  _user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  _idea: { type: mongoose.Schema.Types.ObjectId, ref: 'Idea' },
  text: String,
  created: Date,
  updated: Date

})

updateSchema.pre('save', function (next) {
  if (!this.created) this.created = new Date()
  this.updated = new Date()
  next()
})

updateSchema.pre('findOne', function (next) {
  this.populate('_user', 'profile')
  this.populate('_idea')
  next()
})

updateSchema.pre('find', function (next) {
  this.populate('_user', 'profile')
  this.populate('_idea')
  next()
})

module.exports = mongoose.model('Document', updateSchema)
