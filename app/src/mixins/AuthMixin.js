import * as config from '@/api/config'
import { instance } from '@/mixins/Instance'

export default {
  methods: {
    oAuthLink (network) {
      switch (network) {
        case 'facebook':
          return `${config.API_ADDRESS}/auth/facebook/login/${instance()}`
      }
    }
  }
}
