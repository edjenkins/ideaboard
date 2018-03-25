require('dotenv').config()

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const port = process.env.PORT || 3000
const passport = require('passport')
const flash = require('connect-flash')

const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const session = require('express-session')
const RedisStore = require('connect-redis')(session)

const config = require('./config.js')
const configDB = require('./config/database.js')
const seed = require('./config/seed.js')
// const demo = require('./config/demo.js')

const app = express()

require('./config/passport')(passport) // pass passport for configuration

app.use(cors({
  credentials: true,
  origin: ['http://localhost:8888', 'https://ideaboard.co.uk', /\.ideaboard\.co.uk$/],
  methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
  headers: ['X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version']
}))

// Instance middleware
app.use(function (req, res, next) {
  const url = req.get('Referrer')
  let instance = 'ideaboard'
  if (url) {
    const matches = url.match(/^https?:\/\/([^/?#]+)(?:[/?#]|$)/i)
    const domain = matches[1]
    const subdomain = domain.split('.')[0]
    instance = (!subdomain) ? 'localhost' : subdomain
  }
  req.instance = (instance.indexOf('localhost') !== -1) ? config.instances.default : instance

  next()
})

mongoose.connect(configDB.url, { useMongoClient: true }) // connect to our database

// set up our express application
app.use(morgan('dev')) // log every request to the console
app.use(cookieParser()) // read cookies (needed for auth)
app.use(bodyParser())
app.use(bodyParser.urlencoded({
  extended: true,
  parameterLimit: 100000,
  limit: '200mb'
}))
app.use(bodyParser.json())

app.use(session({
  store: new RedisStore({
    // client: ,
    // socket: ,
    // url: ,
    host: 'redis',
    port: 6379
  }),
  secret: process.env.PASSPORT_SESSION_SECRET || 'not_very_secret',
  resave: false
}))

// required for passport
app.use(passport.initialize())
app.use(passport.session()) // persistent login sessions
app.use(flash()) // use connect-flash for flash messages stored in session

app.get('/',
  (req, res) => {
    res.send('Ideaboard API')
  })

require('./app/routes/auth.js')(app, passport)
require('./app/routes/unsplash.js')(app, passport)
require('./app/routes/upload.js')(app, passport)
require('./app/routes/user.js')(app, passport)
require('./app/routes/idea.js')(app, passport)
require('./app/routes/category.js')(app, passport)
require('./app/routes/comment.js')(app, passport)
require('./app/routes/task.js')(app, passport)
require('./app/routes/update.js')(app, passport)
require('./app/routes/task-response.js')(app, passport)
require('./app/routes/invitation.js')(app, passport)
require('./app/routes/permission.js')(app, passport)
require('./app/routes/notification.js')(app, passport)
require('./app/routes/document.js')(app, passport)
require('./app/routes/moderate.js')(app, passport)

app.listen(port, () => {
  console.log(`Listening on port ${port}!`)
})
