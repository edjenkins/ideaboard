const mongoose = require('mongoose')

const ideaSchema = mongoose.Schema({

  _user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  slug: String,
  title: String,
  tagline: String,
  description: String,
  banner: String,
  instance: String,
  created: Date,
  _subscribers: [{
    _user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    subscribedAt: Date
  }],
  _updates: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Update' }],
  _categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }]

})

ideaSchema.pre('save', function (next) {
  if (!this.created) this.created = new Date()
  next()
})

ideaSchema.pre('findOne', function (next) {
  this.populate('_user', 'profile')
  this.populate({
    path: '_subscribers._user',
    model: 'User',
    select: 'profile'
  })
  this.populate('_updates')
  next()
})

ideaSchema.pre('find', function (next) {
  this.populate('_user', 'profile')
  next()
})

module.exports = mongoose.model('Idea', ideaSchema)
