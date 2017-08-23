import Vue from 'vue'
import Vuex from 'vuex'
import Store from '@/store'

import instances from '@/instances'
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
      return ((subdomain === 'localhost') || (subdomain === 'eventspark')) ? instances.default : subdomain.toLowerCase() // subdomain
    },
    navColor () {
      return instances[Store.getters.instance].color
    }
  }
})
