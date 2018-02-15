const mongoose = require('mongoose')

const taskSchema = mongoose.Schema({

  _user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  _idea: { type: mongoose.Schema.Types.ObjectId, ref: 'Idea' },
  type: String,
  title: String,
  description: String,
  meta: mongoose.Schema.Types.Mixed,
  pinned: Boolean,
  locked: Boolean,
  archived: Boolean,
  created: Date,
  _responses: [{ type: mongoose.Schema.Types.ObjectId }]

})

taskSchema.pre('save', function (next) {
  if (!this.created) this.created = new Date()
  next()
})

taskSchema.pre('findOne', function (next) {
  this.populate('_user', 'profile')
  next()
})

taskSchema.pre('find', function (next) {
  this.populate('_user', 'profile')
  next()
})

module.exports = mongoose.model('Task', taskSchema)
