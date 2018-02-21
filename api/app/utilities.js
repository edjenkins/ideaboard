const DEV_URL = 'http://localhost:8888'
const PROD_URL = 'https://*ideaboard.co.uk'

module.exports = {
  redirectUri: function (instance) {
    switch (instance) {
      case 'default':
        return DEV_URL
      case 'master':
        return PROD_URL.replace('*', '')
      default:
        return PROD_URL.replace('*', instance)
    }
  }
}