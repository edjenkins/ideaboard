const mongoose = require('mongoose')
const mail = require('../../app/services/mail')

const Idea = require('./idea')
const User = require('./user')

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
  destroyed: Date,
  _responses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TaskResponse' }]

})

taskSchema.pre('save', function (next) {
  if (!this.created) this.created = new Date()
  next()
})

taskSchema.pre('findOne', function (next) {
  this.where({ destroyed: null })
  this.populate('_user', 'profile')
  next()
})

taskSchema.pre('find', function (next) {
  this.where({ destroyed: null })
  this.populate('_user', 'profile')
  this.populate('_responses', '_user')
  next()
})

taskSchema
  .virtual('contributors')
  .get(function () {
    return this._responses
  })

module.exports = mongoose.model('Task', taskSchema)
