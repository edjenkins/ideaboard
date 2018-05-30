// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'
import vueLogger from 'vue-logger'
// import Meta from 'vue-meta'
import VueAnalytics from 'vue-analytics'
import VueSession from 'vue-session'
import { sync } from 'vuex-router-sync'

import App from '@/App'
import config from '@/config'
import store from '@/store'
import router from '@/router'

// Uncomment for drift support
// require('@/assets/scripts/drift.js')

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

let cookieConsent = () => {
  var name = 'cookieconsent_status' + '='
  var decodedCookie = decodeURIComponent(document.cookie)
  var ca = decodedCookie.split(';')
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i]
    while (c.charAt(0) === ' ') {
      c = c.substring(1)
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length)
    }
  }
  return ''
}

let enableAnalytics = () => {
  Vue.use(VueAnalytics, {
    id: config.gakey,
    router,
    autoTracking: {
      exception: true
    },
    anonymizeIp: true
  })
}

let disableAnalytics = () => {
  document.cookie.split(';').forEach((c) => { document.cookie = c.replace(/^ +/, '').replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/') })
}

if (cookieConsent() === 'allow') {
  enableAnalytics()
}

window.addEventListener('consent-updated', function (e) {
  if (cookieConsent() === 'allow') {
    enableAnalytics()
  } else {
    disableAnalytics()
  }
})

Vue.filter('resize', function (input, height, width) {
  width = (!width) ? height : width
  return `${input.replace(/(.)*ideaboard(.)*.com\//i, `${config.cdn1}/${height}x${width}/`)}`
})

Vue.filter('background', function (input) {
  return { 'background-image': `url(${input})` }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
