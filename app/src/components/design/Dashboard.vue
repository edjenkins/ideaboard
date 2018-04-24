<template lang="pug">
.design-dashboard

  ul.dashboard-controls
    li(@click="listLayout = !listLayout")
      p List View
      span(v-show="listLayout")
        i.fas.fa-toggle-on
      span(v-show="!listLayout")
        i.fas.fa-toggle-off
    .clearfix

  .design-dashboard--tasks

    // No tasks
    .no-tasks(v-if="orderedTasks.length === 0") {{ loadingTasks ? 'Please wait...' : 'No tasks added yet!' }}
    
    design-task-tile(v-for="(task, index) in orderedTasks" v-bind:key="index" v-bind:task="task" v-on:loadTask="loadTask(task)" v-bind:list-layout="listLayout")

    .clearfix

  .actions-wrapper
    router-link#add-task(v-if="isAuthenticated" v-bind:to="{ name: 'addtask', params: { id: idea._id} }")
      i.fas.fa-plus
    #add-task(v-else @click="checkAuth")
      i.fas.fa-plus

</template>

<script>
import _sortBy from 'lodash/sortBy'
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
      listLayout: false,
      loadingTasks: false,
      tasks: []
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated']),
    orderedTasks () {
      return _sortBy(this.tasks, ['pinned', '_responses']).reverse()
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
  position relative

  ul.dashboard-controls
    cleanlist()
    display block
    padding 10px 10px 0 10px
    li
      cleanlist()
      display inline-block
      color $color-text-grey
      text-align right
      padding 5px 15px
      p
        reset()
        display inline-block
        line-height 40px
        margin-right 5px
      &:hover
        cursor pointer

  .design-dashboard--tasks
    display flex
    justify-content space-between
    flex-wrap wrap
    margin -10px
    padding 10px 25px 25px 25px

    .no-tasks
      color $color-text-grey
      margin 30px auto
      padding 28px 20px
      text-align center
  
  .actions-wrapper
    background-color $color-success
    #add-task
      animate()
      border-box()
      color white
      display block
      overflow hidden
      position relative
      text-align center
      text-decoration none
      svg
        animate()
        color white
        height 60px
        width 20px
      &:hover
        cursor pointer
        svg
          color white
</style>
