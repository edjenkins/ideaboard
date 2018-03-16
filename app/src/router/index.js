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

// Idea Tabs
import InfoTab from '@/components/ideas/tabs/InfoTab'
import DesignTab from '@/components/ideas/tabs/DesignTab'
import OutcomeTab from '@/components/ideas/tabs/OutcomeTab'

// Idea Design Tab
import DesignDashboard from '@/components/design/Dashboard'
import AddDesignTask from '@/components/design/AddTask'
import Discussion from '@/components/design/modules/Discussion'
import Poll from '@/components/design/modules/Poll'
import Media from '@/components/design/modules/Media'
import Appearin from '@/components/design/modules/Appearin'
import Whiteboard from '@/components/design/modules/Whiteboard'

// Idea Outcome Tab
import OutcomeDashboard from '@/components/outcome/Dashboard'
import OutcomeMedia from '@/components/outcome/Media'
import OutcomeSubscribers from '@/components/outcome/Subscribers'
import OutcomeUpdates from '@/components/outcome/Updates'
import OutcomeDocument from '@/components/outcome/Document'

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
      component: Idea,
      props: true,
      children: [
        {
          name: 'idea',
          path: 'info',
          component: InfoTab
        },
        {
          name: 'design',
          path: 'design',
          component: DesignTab,
          children: [
            {
              name: 'designdashboard',
              path: '/',
              component: DesignDashboard
            },
            {
              name: 'addtask',
              path: 'add',
              component: AddDesignTask
            },
            {
              name: 'discussion',
              path: 'discussion/:task_id',
              component: Discussion
            },
            {
              name: 'poll',
              path: 'poll/:task_id',
              component: Poll
            },
            {
              name: 'media',
              path: 'media/:task_id',
              component: Media
            },
            {
              name: 'appearin',
              path: 'appearin/:task_id',
              component: Appearin
            },
            {
              name: 'whiteboard',
              path: 'whiteboard/:task_id',
              component: Whiteboard
            }
          ]
        },
        {
          name: 'outcome',
          path: 'outcome',
          component: OutcomeTab,
          children: [
            {
              name: 'outcomedashboard',
              path: '/',
              component: OutcomeDashboard
            },
            {
              name: 'outcomemedia',
              path: 'media',
              component: OutcomeMedia
            },
            {
              name: 'outcomesubscribers',
              path: 'subscribers',
              component: OutcomeSubscribers
            },
            {
              name: 'outcomeupdates',
              path: 'updates',
              component: OutcomeUpdates
            },
            {
              name: 'outcomedocument',
              path: 'document',
              component: OutcomeDocument
            }
          ]
        }
      ]
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
