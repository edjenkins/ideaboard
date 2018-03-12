<template lang="pug">
.tab-content--outcome
  #idea-tools
    h1.tab--header(v-bind:class="{ 'no-parent': (activeComponent === 'dashboard') }")
      .tab--header--previous(name="home" @click="goToDashboard")
        i.fas.fa-arrow-left
        
      .tab--header--title {{ (activeComponent === 'dashboard') ? titles[activeComponent] : activeComponent }}
      //- .tab--header--action
        span(v-if="activeComponent && (activeComponent != 'dashboard')") {{ activeComponent }}
        span(v-else)
          i.fas.fa-question

    transition(v-bind:name="transitionType" mode="out-in")
      component(v-bind:is="activeComponent" v-bind:idea="idea" v-bind:activeTool.sync="activeComponent" v-on:back="goToDashboard")
</template>

<script>
import Dashboard from '@/components/outcome/Dashboard'
import Media from '@/components/outcome/Media'
import Subscribers from '@/components/outcome/Subscribers'
import Updates from '@/components/outcome/Updates'

export default {
  name: 'outcome-tab',
  props: ['idea'],
  components: {
    Dashboard,
    Media,
    Subscribers,
    Updates
  },
  data () {
    return {
      titles: {
        'dashboard': ''
      },
      transitionType: '',
      activeComponent: 'dashboard',
      disableTransitions: true
    }
  },
  watch: {
    activeTool (nV) {
      if (!nV) {
        this.activeComponent = 'dashboard'
        this.transitionType = this.disableTransitions ? 'true' : 'left-fade'
      } else {
        this.activeComponent = this.activeTool.type
        this.transitionType = this.disableTransitions ? 'true' : 'right-fade'
      }
    }
  },
  methods: {
    goToDashboard () {
      this.activeComponent = 'dashboard'
    }
  }
}
</script>

<style lang="stylus" scoped>

@import '~stylus/shared'

.tab-content--outcome
  background-color white
  h1.tab--header.no-parent
    height 0 !important
    padding-top 0 !important
    padding-bottom 0 !important
    min-height 0 !important
    border none !important
    opacity 0 !important
  .tab--content
    border-bottom $color-border 1px solid
    padding 20px
    p
      reset()
</style>