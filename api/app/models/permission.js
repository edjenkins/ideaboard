const mongoose = require('mongoose')

const permissionSchema = mongoose.Schema({

  type: String,
  description: String,
  instance: String,
  created: Date

})

permissionSchema.pre('save', function (next) {
  if (!this.created) this.created = new Date()
  next()
})

module.exports = mongoose.model('Permission', permissionSchema)
