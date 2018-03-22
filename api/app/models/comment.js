const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({

  _user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  _target: mongoose.Schema.Types.ObjectId,
  type: String,
  text: String,
  created: Date,
  destroyed: Date,
  _likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  _dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  _replies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]

})

commentSchema.pre('save', function (next) {
  if (!this.created) this.created = new Date()
  next()
})

commentSchema.pre('findOne', function (next) {
  this.where({ destroyed: null })
  this.populate('_user', 'profile')
  this.populate('_replies')
  this.populate({
    path: '_likes._user',
    model: 'User',
    select: 'profile'
  })
  this.populate({
    path: '_dislikes._user',
    model: 'User',
    select: 'profile'
  })
  next()
})

commentSchema.pre('find', function (next) {
  this.where({ destroyed: null })
  this.populate('_user', 'profile')
  this.populate('_replies')
  // this.populate({
  //   path: '_likes._user',
  //   model: 'User',
  //   select: 'profile'
  // })
  // this.populate({
  //   path: '_dislikes._user',
  //   model: 'User',
  //   select: 'profile'
  // })
  next()
})

module.exports = mongoose.model('Comment', commentSchema)
