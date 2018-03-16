const _get = require('lodash/get')
const mongoose = require('mongoose')
const config = require('../../config.js')

const User = require('./user')
const Task = require('./task')

const ideaSchema = mongoose.Schema({

  _user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  slug: String,
  title: String,
  tagline: String,
  description: String,
  banner: String,
  instance: String,
  created: Date,
  _parent: { type: mongoose.Schema.Types.ObjectId, ref: 'Idea' },
  _children: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Idea' }],
  _subscribers: [{
    _user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    subscribedAt: Date
  }],
  _tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
  _updates: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Update' }],
  _categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }]

})

// Pre middleware

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
  this.populate('_children')
  next()
})

ideaSchema.pre('find', function (next) {
  this.populate('_user', 'profile')
  this.populate('_children')
  next()
})

// Post middleware
ideaSchema.post('save', async function (idea) {
  console.log(`Seeding tasks for ${idea._id}...`)
  
  const instance = config.instances[idea.instance]
  const adminEmail = _get(instance, 'admin.email', process.env.ADMIN_EMAIL)
  const admin = User.findOne({ 'local.email': adminEmail })

  let promises = []

  if (typeof instance.tasks !== 'undefined') {
    const tasks = instance.tasks
    tasks.forEach(task => {
      // Loop ideas
      task._idea = idea._id
      task._user = admin._id
      promises.push(new Promise(resolve => {
        task = new Task(task)
        task.save().then((task) => {
          resolve(task)
        })
      }))
    })
  }

  Promise.all(promises)
})

module.exports = mongoose.model('Idea', ideaSchema)
