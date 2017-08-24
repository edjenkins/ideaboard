import Vue from 'vue'
import Vuex from 'vuex'
import Store from '@/store'

import config from '@/config'
import auth from '@/store/modules/auth'
import idea from '@/store/modules/idea'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    idea
  },
  state: {
    debug: false
  },
  getters: {
    instance () {
      const subdomain = window.location.hostname.split('.')[0]
      return ((subdomain === 'localhost') || (subdomain === config.domain.split('.')[0])) ? config.instances.default : subdomain.toLowerCase() // subdomain
    },
    navColor () {
      return config.instances[Store.getters.instance].color
    }
  }
})
