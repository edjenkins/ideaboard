var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_ADDRESS: '"http://localhost:3000"',
  DRIFT_KEY: '"msffsx6pi5gb"'
})
