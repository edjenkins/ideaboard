var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_ADDRESS: '"http://localhost:3000"',
  ADMIN_NAME: '"Admin"',
  ADMIN_EMAIL: '"admin@ideaboard.co.uk"',
  ADMIN_PASSWORD: '"DxUmgqAXGhden2Ut"'
})
