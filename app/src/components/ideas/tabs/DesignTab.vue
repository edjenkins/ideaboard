<template lang="pug">

.tab-content--design
  h1.tab--header(v-bind:class="{ 'no-parent': (activeComponent === 'dashboard') }")
    .tab--header--previous(name="home" @click="goToDashboard")
      i.fas.fa-arrow-left
    .tab--header--title
      | {{ (activeTask) ? activeTask.title : titles[activeComponent] }}
    .tab--header--action(@click="toggleMaximise")
      span
        i.fas.fa-arrows-alt-h

  transition(v-bind:name="transitionType" mode="out-in")
    component(v-bind:is="activeComponent" v-bind:idea="idea" v-bind:activeTask.sync="activeTask" v-on:add-task="addTask" v-on:back="goToDashboard")

</template>

<script>
import { mapGetters } from 'vuex'
import * as types from '@/store/mutation-types'

import Dashboard from '@/components/design/Dashboard'
import AddTask from '@/components/design/AddTask'
import Discussion from '@/components/design/modules/Discussion'
import Poll from '@/components/design/modules/Poll'
import Media from '@/components/design/modules/Media'
import Appearin from '@/components/design/modules/Appearin'
import Whiteboard from '@/components/design/modules/Whiteboard'

export default {
  name: 'design-tab',
  props: ['idea'],
  components: {
    Dashboard,
    AddTask,
    Discussion,
    Poll,
    Media,
    Appearin,
    Whiteboard
  },
  data () {
    return {
      titles: {
        'dashboard': '',
        'add-task': 'Add new task'
      },
      transitionType: '',
      activeComponent: 'dashboard',
      activeTask: undefined,
      disableTransitions: true
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'user'])
  },
  watch: {
    activeTask (nV) {
      if (!nV) {
        this.activeComponent = 'dashboard'
        this.transitionType = this.disableTransitions ? '' : 'left-fade'
      } else {
        this.activeComponent = this.activeTask.type
        this.transitionType = this.disableTransitions ? '' : 'right-fade'
      }
    }
  },
  methods: {
    goToDashboard () {
      this.activeTask = undefined
      this.activeComponent = 'dashboard'
    },
    addTask () {
      if (!this.isAuthenticated) {
        this.$store.commit(types.SHOW_AUTH_MODAL)
      } else {
        if (!this.activeTask) {
          this.activeComponent = 'add-task'
        }
      }
    },
    toggleMaximise () {
      this.$emit('toggle-maximise')
    }
  }
}
</script>

<style lang="stylus" scoped>

@import '~stylus/shared'

.tab-content--design
  min-height 600px
  margin-bottom 30px
  overflow hidden
  h1.tab--header.no-parent
    height 0 !important
    border-color transparent !important
    .tab--header--title
      opacity 0
  .tab--content
    background-color white
    border-bottom $color-border 1px solid
    padding 25px
</style>
