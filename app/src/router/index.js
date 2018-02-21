import Vue from 'vue'
import Router from 'vue-router'
import Store from '@/store'

// Auth
import Auth from '@/components/auth/Auth'
import Reset from '@/components/auth/Reset'

// Pages
import About from '@/components/pages/About'
import Terms from '@/components/pages/Terms'
import Privacy from '@/components/pages/Privacy'
import Profile from '@/components/pages/Profile'

// Ideas
import Start from '@/components/ideas/Start'
import Explore from '@/components/ideas/Explore'
import Idea from '@/components/ideas/Idea'

import config from '@/config'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: function (resolve) {
        const subdomain = window.location.hostname.split('.')[0]
        const instance = ((subdomain === 'localhost') || (subdomain === config.domain.split('.')[0])) ? config.instances.default : subdomain.toLowerCase() // subdomain
        try {
          require(`@/components/instances/${instance}.vue`)
          require([`@/components/instances/${instance}.vue`], resolve)
        } catch (error) {
          require(['@/components/instances/master.vue'], resolve)
        }
      }
    },
    {
      path: '/learn',
      name: 'about',
      component: About
    },
    {
      path: '/terms',
      name: 'terms',
      component: Terms
    },
    {
      path: '/privacy',
      name: 'privacy',
      component: Privacy
    },
    {
      path: '/profile/:id?',
      name: 'profile',
      component: Profile,
      props: true,
      meta: { requiresAuth: true }
    },
    {
      path: '/start',
      name: 'start',
      component: Start
    },
    {
      path: '/explore/:category?',
      name: 'explore',
      component: Explore
    },
    {
      path: '/idea/:id',
      name: 'idea',
      component: Idea,
      props: true
    },
    {
      path: '/auth',
      name: 'auth',
      component: Auth
    },
    {
      path: '/reset/:code?',
      name: 'reset',
      component: Reset,
      props: true
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    console.log(Store.getters.isAuthenticated)
    if (!Store.getters.isAuthenticated) {
      next({
        path: '/auth',
        query: {
          redirect: to.fullPath
        }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
