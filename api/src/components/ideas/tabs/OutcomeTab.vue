<template lang="pug">
.tab-content--outcome
  #idea-tools
    h1.tab--header(v-bind:class="{ 'no-parent': (activeComponent === 'dashboard') }")
      .tab--header--previous(name="home" @click="goToDashboard")
        icon(name="arrow-left")
      span {{ (activeComponent === 'dashboard') ? titles[activeComponent] : activeComponent }}
      .tab--header--action
        span(v-if="activeComponent && (activeComponent != 'dashboard')") {{ activeComponent }}
        span(v-else)
          icon(name="question")

    transition(v-bind:name="transitionType" mode="out-in")
      component(v-bind:is="activeComponent" v-bind:idea="idea" v-bind:activeTool.sync="activeComponent" v-on:back="goToDashboard")
</template>

<script>
import Dashboard from '@/components/outcome/Dashboard'
import Media from '@/components/outcome/Media'
import Subscribers from '@/components/outcome/Subscribers'
import Updates from '@/components/outcome/Updates'

import Icon from 'vue-awesome/components/Icon'
import 'vue-awesome/icons/arrow-left'

export default {
  name: 'outcome-tab',
  props: ['idea'],
  components: {
    Icon,
    Dashboard,
    Media,
    Subscribers,
    Updates
  },
  data () {
    return {
      titles: {
        'dashboard': 'Outcome'
      },
      transitionType: 'left-fade',
      activeComponent: 'dashboard'
    }
  },
  watch: {
    activeTool (nV) {
      if (!nV) {
        this.activeComponent = 'dashboard'
        this.transitionType = 'left-fade'
      } else {
        this.activeComponent = this.activeTool.type
        this.transitionType = 'right-fade'
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

  .tab--content
    border-bottom $color-border 1px solid
    padding 20px
    p
      reset()

</style>