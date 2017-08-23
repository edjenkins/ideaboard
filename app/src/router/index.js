import Vue from 'vue'
import Router from 'vue-router'
import Store from '@/store'

// Auth
import Join from '@/components/auth/Join'
import Reset from '@/components/auth/Reset'

// Pages
import Profile from '@/components/pages/Profile'

// Ideas
import Create from '@/components/ideas/Create'
import Explore from '@/components/ideas/Explore'
import Idea from '@/components/ideas/Idea'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: function (resolve) {
        const subdomain = window.location.hostname.split('.')[0]
        const instance = ((subdomain === 'localhost') || (subdomain === 'eventspark')) ? 'master' : subdomain.toLowerCase() // subdomain
        require([`@/components/instances/${instance}.vue`], resolve)
      }
    },
    {
      path: '/profile/:id?',
      name: 'Profile',
      component: Profile,
      props: true,
      meta: { requiresAuth: true }
    },
    {
      path: '/create',
      name: 'Create',
      component: Create
    },
    {
      path: '/explore',
      name: 'Explore',
      component: Explore
    },
    {
      path: '/idea/:id',
      name: 'Idea',
      component: Idea,
      props: true
    },
    {
      path: '/join',
      name: 'Join',
      component: Join
    },
    {
      path: '/reset/:code?',
      name: 'Reset',
      component: Reset,
      props: true
    }
  ]
})

console.log(Store)

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    console.log(Store.getters.isAuthenticated)
    if (!Store.getters.isAuthenticated) {
      next({
        path: '/join',
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
