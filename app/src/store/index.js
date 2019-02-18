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
    instanceColor () {
      return config.instances[Store.getters.instance].color
    },
    instanceForeground () {
      return { 'color': config.instances[Store.getters.instance].color }
    },
    instanceBackground () {
      return { 'background-color': config.instances[Store.getters.instance].color }
    },
    instanceLogoTitle () {
      return config.instances[Store.getters.instance].logoTitle || 'Ideaboard'
    },
    instanceLogoColor () {
      return config.instances[Store.getters.instance].logoColor || 'white'
    },
    instanceOutcome () {
      return config.instances[Store.getters.instance].outcome || {title: 'Outcome', ideaDocument: {title: 'Idea Document'}, followIdea: {title: 'Start follow on Idea'}}
    },
    instanceCreateIdea () {
      return config.instances[Store.getters.instance].createIdea || {
        title: 'Create an Idea',
        subtitle: 'This is where it begins, start an Idea, invite some friends and begin designing!',
        inputFields: {
          title: {
            name: 'Title', placeholder: 'Give your idea a title'
          },
          tagline: {
            name: 'Tagline', placeholder: 'A short summary of your idea'
          },
          description: {
            name: 'Description', placeholder: 'Describe your idea in more detail'
          }
        }
      }
    }
  }
})
