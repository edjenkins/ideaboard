'use strict'
const configMail = require('../../config/mail.js')

const _map = require('lodash/map')
const _forEach = require('lodash/forEach')

const nodemailer = require('nodemailer')
const path = require('path')
var EmailTemplate = require('email-templates').EmailTemplate
var templatesDir = path.resolve(__dirname, '../../templates')

const MAIL_HOST = configMail.host
const MAIL_PORT = configMail.port
const MAIL_USERNAME = configMail.username
const MAIL_PASSWORD = configMail.password
const MAIL_FROM_NAME = configMail.fromName
const MAIL_FROM_ADDRESS = configMail.fromAddress

const User = require('../models/user')

const utilities = require('../../app/utilities')

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  host: MAIL_HOST,
  port: MAIL_PORT,
  secure: false,
  auth: {
    user: MAIL_USERNAME,
    pass: MAIL_PASSWORD
  }
})

module.exports = {
  sendMail: function (to, subject, template, data, from) {
    console.log('Sending mail...')

    var emailTemplate = new EmailTemplate(path.join(templatesDir, template))
    if (!from)
      from = `"${MAIL_FROM_NAME}" <${MAIL_FROM_ADDRESS}>`;

    emailTemplate.render(data, function (err, results) {
      if (err) return console.error(err)

        // setup email data with unicode symbols
      let mailOptions = {
        from: from, // sender address
        to: to, // list of receivers CSV
        subject: subject,
        html: results.html,
        text: results.text
      }

      // send mail with defined transport object
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log(error)
        }
        console.log('Message %s sent: %s', info.messageId, info.response)
      })
    })
  },
  sendUpdate: function (idea, update) {
    console.log('Sending updates...')
    const subscriberIds = _map(idea._subscribers, (subscriber) => {
      return subscriber._user
    })
    console.log('subscriberIds')
    console.log(subscriberIds)
    User.find({
      '_id': { $in: subscriberIds }
    }, (err, users) => {
      if (err) console.error(err)
      console.log('users')
      console.log(users)
      _forEach(users, (user) => {
        this.sendMail(user.local.email, 'Update Received', 'update-received', { user: user, idea: idea, update: update, url: utilities.redirectUri(idea.instance) })
      })
    })
  }
}
