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

const configDB = require('./config/database.js')

const app = express()

require('./config/passport')(passport) // pass passport for configuration

app.use(cors({
  credentials: true,
  origin: ['http://localhost:8080', 'https://ideaboard.co.uk', /\.ideaboard\.co.uk$/],
  methods: ['GET', 'PUT', 'POST']
}))

mongoose.connect(configDB.url) // connect to our database

// set up our express application
app.use(morgan('dev')) // log every request to the console
app.use(cookieParser()) // read cookies (needed for auth)
app.use(bodyParser())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// required for passport
app.use(session({ secret: process.env.PASSPORT_SESSION_SECRET })) // session secret
app.use(passport.initialize())
app.use(passport.session()) // persistent login sessions
app.use(flash()) // use connect-flash for flash messages stored in session

require('./app/routes/auth.js')(app, passport)
require('./app/routes/unsplash.js')(app, passport)
require('./app/routes/upload.js')(app, passport)
require('./app/routes/user.js')(app, passport)
require('./app/routes/idea.js')(app, passport)
require('./app/routes/comment.js')(app, passport)
require('./app/routes/task.js')(app, passport)
require('./app/routes/update.js')(app, passport)
require('./app/routes/task-response.js')(app, passport)

app.listen(port, () => {
  console.log(`Listening on port ${port}!`)
})
