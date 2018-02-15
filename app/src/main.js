// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'
import vueLogger from 'vue-logger'
// import Meta from 'vue-meta'
import VueSession from 'vue-session'
import { sync } from 'vuex-router-sync'

import App from '@/App'
import store from '@/store'
import router from '@/router'
import Icon from 'vue-awesome/components/Icon'

require('@/assets/scripts/drift.js')

Vue.component('icon', Icon)

sync(store, router)

Vue.config.productionTip = false

Vue.use(Vuex)
Vue.use(VueResource)
// Vue.use(Meta)
Vue.use(VueSession)

Vue.use(vueLogger, {
  prefix: new Date(),
  dev: true,
  shortname: true,
  levels: ['log', 'warn', 'debug', 'error', 'dir']
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
