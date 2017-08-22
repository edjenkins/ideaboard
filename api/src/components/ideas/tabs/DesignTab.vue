<template lang="pug">
.tab-content--design
  h1.tab--header(v-bind:class="{ 'no-parent': (activeComponent === 'dashboard') }")
    .tab--header--previous(name="home" @click="goToDashboard")
      icon(name="arrow-left")
    span {{ (activeTask) ? activeTask.title : titles[activeComponent] }}
    .tab--header--action(v-if="activeComponent != 'add-task'" @click="addTask")
      span(v-if="activeTask") {{ activeComponent }}
      span(v-else)
        icon(name="plus")
  transition(v-bind:name="transitionType" mode="out-in")
    component(v-bind:is="activeComponent" v-bind:idea="idea" v-bind:activeTask.sync="activeTask" v-on:add-task="addTask" v-on:back="goToDashboard")

  transition(v-bind:name="transitionType" mode="out-in")
    #general-discussion(v-if="activeComponent === 'dashboard'")
      h1.tab--header.no-parent
        span General Chat
      discussion(v-bind:idea="idea" v-bind:activeTask="{ title: 'discussion', component: 'discussion' }" v-on:add-task="addTask" v-on:back="goToDashboard")
</template>

<script>
import { mapGetters } from 'vuex'
import Icon from 'vue-awesome/components/Icon'
import 'vue-awesome/icons/arrow-left'
import 'vue-awesome/icons/plus'

import Dashboard from '@/components/design/Dashboard'
import AddTask from '@/components/design/AddTask'
import Discussion from '@/components/design/modules/Discussion'
import Poll from '@/components/design/modules/Poll'

export default {
  name: 'design-tab',
  props: ['idea'],
  components: {
    Icon,
    Dashboard,
    AddTask,
    Discussion,
    Poll
  },
  data () {
    return {
      titles: {
        'dashboard': 'Popular Discussions',
        'add-task': 'Add New'
      },
      transitionType: 'left-fade',
      activeComponent: 'dashboard',
      activeTask: undefined
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'user'])
  },
  watch: {
    activeTask (nV) {
      if (!nV) {
        this.activeComponent = 'dashboard'
        this.transitionType = 'left-fade'
      } else {
        this.activeComponent = this.activeTask.type
        this.transitionType = 'right-fade'
      }
    }
  },
  methods: {
    goToDashboard () {
      this.activeTask = undefined
      this.activeComponent = 'dashboard'
    },
    addTask () {
      if (!this.isAuthenticated) { alert('You need to be logged in to do that!') } else {
        if (!this.activeTask) {
          this.activeComponent = 'add-task'
        }
      }
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
  .tab--content
    background-color white
    border-bottom $color-border 1px solid
    padding 25px

  #general-discussion
    // border-top $color-border 1px solid
    margin-top 20px

</style>
