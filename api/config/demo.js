const config = require('../config.js')

const Permission = require('../app/models/permission')
const User = require('../app/models/user')
const Idea = require('../app/models/idea')
const Category = require('../app/models/category')

// Remove old data
Promise.all([
  new Promise(resolve => { Idea.remove({}).exec((err) => { resolve() }) }),
  new Promise(resolve => { User.remove({}).exec((err) => { resolve() }) }),
  new Promise(resolve => { Category.remove({}).exec((err) => { resolve() }) })
]).then(() => {
  setupPermissions()
})

function setupPermissions () {
  // Setup permissions
  const permissions = [
    { type: 'admin', description: 'Administrate the system' },
    { type: 'organiser', description: 'Manage categories and content' },
    { type: 'moderator', description: 'Moderate content submitted by users' }
  ]

  // Store permissions
  let promises = []
  let adminPermissions = []
  
  for (const instance in config.instances) {
    // Loop permissions
    for (const key in permissions) {
      let newPermission = permissions[key]
      newPermission.instance = instance

      promises.push(new Promise(resolve => {
        Permission.findOneAndUpdate({ instance: instance, type: newPermission.type }, newPermission, { upsert: true, setDefaultsOnInsert: true }, (err, permission) => {
          if (err) console.error(err)
          adminPermissions.push(permission._id)
          resolve()
        })
      }))
    }
  }

  // Assign permissions
  Promise.all(promises).then(() => {
    setupAdmin(adminPermissions)
  })
}

function setupAdmin(adminPermissions) {
  const adminUser = {
    'profile.name': process.env.ADMIN_NAME,
    'profile.bio': process.env.ADMIN_BIO,
    'local.email': process.env.ADMIN_EMAIL,
    'local.password': process.env.ADMIN_PASSWORD,
    '_permissions': adminPermissions
  }

  User.findOneAndUpdate({ 'local.email': process.env.ADMIN_EMAIL }, adminUser, { upsert: true, setDefaultsOnInsert: true }, (err) => {
    if (err) console.error(err)
    console.log('Admin created')
    User.findOne({ 'local.email': process.env.ADMIN_EMAIL }, (err, admin) => {
      if (err) console.error(err)
      setupCategories(admin._id)
      console.log(admin)
    })
  })
}

function setupCategories (adminId) {

  let promises = []

  const categories = [
    { _user: adminId, name: 'Category A', tag: 'category-a', instance: 'default' },
    { _user: adminId, name: 'Category B', tag: 'category-b', instance: 'default' }
  ]

  categories.forEach(data => {
    promises.push(new Promise(resolve => {
      const category = new Category(data)
      category.save((err, result) => {
        resolve(result)
      })
    }))
  })

  // Categories saved
  Promise.all(promises).then((categories) => {
    console.log('Categories saved')
    console.log(categories)
    setupIdeas(adminId, categories)
  })
}

// const setupIdeas = async function (adminId, categories) {
function setupIdeas(adminId, categories) {

  ideas.forEach(idea => {

    // delete idea.category
    setupIdea(idea, adminId, categories)
  })
}

async function setupIdea(idea, adminId, categories) {

  const category = await Category.findOne({ tag: idea.category }).exec()

  idea._categories = [category._id]
  idea._user = adminId

  const newIdea = await Idea.findOneAndUpdate({ title: idea.title }, idea, { upsert: true, setDefaultsOnInsert: true }).exec()

  return newIdea
}

const ideas = [
  {
    title: "Python Class",
    tagline: "I would like to run a course to teach people to use Python.",
    description: "<p>We are running a course to allow people to pick up the basics of Python programming quickly with the help of their fellow students.</p><p>If you are interested in this course hit subscribe to stay updated.</p>",
    banner: "https://images.unsplash.com/photo-1454165205744-3b78555e5572?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjExNTQ1fQ&s=35f814ed36b12d9c514212a3d4afb364",
    instance: "default",
    category: 'category-a'
  },
  {
    title: "Study Skills",
    tagline: "Join us for a study skills session",
    description: "<p>Do you want to learn some new study skills?</p>",
    banner: "https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjExNTQ1fQ&s=c6f5a82709c011430d5f28ecc50fa925",
    instance: "default",
    category: 'category-a'
  },
  {
    title: "Presentation Practice",
    tagline: "Learn how to present to a medium audience",
    description: "<p>Join in on a fun presentation skills session and level up your communications!</p>",
    banner: "https://xmovement.s3.amazonaws.com/ideaboard/52077fb64bb3f0bf9b99e2bec0bf9d0a1516981683943.jpeg",
    instance: "default",
    category: 'category-b'
  }
]