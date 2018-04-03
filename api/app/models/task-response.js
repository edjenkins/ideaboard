const mongoose = require('mongoose')

const taskResponseSchema = mongoose.Schema({

  _user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  _task: { type: mongoose.Schema.Types.ObjectId, ref: 'Task' },
  type: String,
  response: mongoose.Schema.Types.Mixed,
  response_meta: mongoose.Schema.Types.Mixed,
  created: Date,
  destroyed: Date,
  _likes: [{
    _user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    likedAt: Date
  }],
  _dislikes: [{
    _user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    dislikedAt: Date
  }]

})

taskResponseSchema.pre('save', function (next) {
  if (!this.created) this.created = new Date()
  next()
})

taskResponseSchema.pre('findOne', function (next) {
  this.where({ destroyed: null })
  this.populate('_user', 'profile')
  this.populate('_task')
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

taskResponseSchema.pre('find', function (next) {
  this.where({ destroyed: null })
  this.populate('_user', 'profile')
  this.populate('_task')
  next()
})

module.exports = mongoose.model('TaskResponse', taskResponseSchema)
