import Vue from 'vue'
import Router from 'vue-router'
import Store from '@/store'

// Auth
const Auth = () => import('@/components/auth/Auth')
const Reset = () => import('@/components/auth/Reset')

// Pages
const Terms = () => import('@/components/pages/Terms')
const Privacy = () => import('@/components/pages/Privacy')
const Profile = () => import('@/components/pages/Profile')

// Ideas
const Start = () => import('@/components/ideas/Start')
const Explore = () => import('@/components/ideas/Explore')
const Idea = () => import('@/components/ideas/Idea')

// Idea Tabs
const InfoTab = () => import('@/components/ideas/tabs/InfoTab')
const DesignTab = () => import('@/components/ideas/tabs/DesignTab')
const OutcomeTab = () => import('@/components/ideas/tabs/OutcomeTab')

// Idea Design Tab
const DesignDashboard = () => import('@/components/design/Dashboard')
const AddDesignTask = () => import('@/components/design/AddTask')
const Discussion = () => import('@/components/design/modules/Discussion')
const Poll = () => import('@/components/design/modules/Poll')
const Media = () => import('@/components/design/modules/Media')
const RichText = () => import('@/components/design/modules/RichText')
const Appearin = () => import('@/components/design/modules/Appearin')
const Whiteboard = () => import('@/components/design/modules/Whiteboard')
const Webcam = () => import('@/components/design/modules/Webcam')

// Idea Outcome Tab
const OutcomeDashboard = () => import('@/components/outcome/Dashboard')
const OutcomeMedia = () => import('@/components/outcome/Media')
const OutcomeSubscribers = () => import('@/components/outcome/Subscribers')
const OutcomeUpdates = () => import('@/components/outcome/Updates')
const OutcomeDocument = () => import('@/components/outcome/Document')

import config from '@/config'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
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
      component: function (resolve) {
        const subdomain = window.location.hostname.split('.')[0]
        const instance = ((subdomain === 'localhost') || (subdomain === config.domain.split('.')[0])) ? config.instances.default : subdomain.toLowerCase() // subdomain
        try {
          require(`@/components/instances/pages/About/${instance}.vue`)
          require([`@/components/instances/pages/About/${instance}.vue`], resolve)
        } catch (error) {
          require(['@/components/pages/About.vue'], resolve)
        }
      }
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
              component: AddDesignTask,
              meta: { requiresAuth: true }
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
              name: 'richtext',
              path: 'richtext/:task_id',
              component: RichText
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
            },
            {
              name: 'webcam',
              path: 'webcam/:task_id',
              component: Webcam
            }
          ]
        },
        {
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
