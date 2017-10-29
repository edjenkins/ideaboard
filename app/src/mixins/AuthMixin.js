import * as config from '@/api/config'

export default {
  methods: {
    oAuthLink (network) {
      switch (network) {
        case 'facebook':
          const url = window.location.origin
          const matches = url.match(/^https?:\/\/([^/?#]+)(?:[/?#]|$)/i)
          const domain = matches && matches[1]
          const instance = (config.NODE_ENV === 'development') ? 'localhost' : domain
          return `${config.API_ADDRESS}/auth/facebook/login/${instance}`
      }
    }
  }
}
