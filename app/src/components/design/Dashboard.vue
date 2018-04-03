<template lang="pug">
.design-dashboard

  .design-dashboard--tasks

    // No tasks
    .no-tasks(v-if="orderedTasks.length === 0") No tasks added yet!
    
    design-task-tile(v-for="(task, index) in orderedTasks" v-bind:key="index" v-bind:task="task" v-on:loadTask="loadTask(task)")

    .clearfix

  .actions-wrapper

    router-link#add-task(v-if="isAuthenticated" v-bind:to="{ name: 'addtask', params: { id: idea._id} }") Add new task
    #add-task(v-else @click="checkAuth") Add new task

</template>

<script>
import _ from 'lodash'
import API from '@/api'
import Avatar from '@/components/user/Avatar'
import DesignTaskTile from '@/components/design/components/DesignTaskTile'
import { mapGetters } from 'vuex'
import * as types from '@/store/mutation-types'

export default {
  name: 'dashboard',
  props: ['activeTask', 'idea'],
  components: {
    Avatar,
    DesignTaskTile
  },
  created () {
    this.loadTasks()
  },
  data () {
    return {
      loadingTasks: false,
      tasks: []
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated']),
    orderedTasks () {
      return _.sortBy(this.tasks, ['_responses']).reverse()
    }
  },
  methods: {
    checkAuth () {
      this.$store.commit(types.SHOW_AUTH_MODAL)
    },
    loadTasks () {
      this.loadingTasks = true
      API.task.dashboard(
        this.idea._id,
        (response) => {
          this.$log(response)
          this.tasks = response.data
          this.loadingTasks = false
        },
        (error) => {
          this.$log(error)
          this.loadingTasks = false
        }
      )
    },
    loadTask (task) {
      this.$emit('update:activeTask', task)
    },
    addTask () {
      this.$emit('add-task')
    }
  }
}
</script>

<style lang="stylus" scoped>

@import '~stylus/shared'

.design-dashboard
  background-color white
  padding 25px
  position relative

  .design-dashboard--tasks
    display flex
    justify-content space-between
    flex-wrap wrap
    margin -10px

    .no-tasks
      color $color-text-grey
      margin 30px auto
      padding 28px 20px
      text-align center
  
  .actions-wrapper
    display flex
    justify-content space-between
    flex-wrap wrap
    margin 10px -10px -10px -10px
    #add-task
      animate()
      border-box()
      radius(30px)
      background-color $color-success
      color white
      display block
      height 60px
      line-height 60px
      margin 10px
      overflow hidden
      padding 0 60px
      position relative
      text-align center
      flex-basis 100%
      text-decoration none
      svg
        animate()
        display none
        color $color-text-grey
        height 20px
        right 0
        padding 19px
        position absolute
        width 20px
      &:hover
        cursor pointer
        svg
          background-color $color-primary
          border-color $color-primary
          color white
</style>
