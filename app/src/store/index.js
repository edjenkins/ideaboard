import Vue from 'vue'
import Vuex from 'vuex'

import auth from './modules/auth'
import idea from './modules/idea'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    idea
  },
  state: {
    debug: false
  }
})
