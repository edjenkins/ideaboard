<template lang="pug">
.design-dashboard

  .design-dashboard--tasks

    design-task-tile(v-for="(task, index) in orderedTasks" v-bind:key="index" v-bind:task="task" v-on:loadTask="loadTask(task)")

    .clearfix

  .actions-wrapper
    #add-task(@click="addTask()") Add new task
    //- #add-task(@click="addTask()") Start a live session

</template>

<script>
import _ from 'lodash'
import API from '@/api'
import Avatar from '@/components/user/Avatar'
import DesignTaskTile from '@/components/design/components/DesignTaskTile'

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
    orderedTasks () {
      return _.sortBy(this.tasks, ['pinned', '_responses.length']).reverse()
    }
  },
  methods: {
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
  
  .actions-wrapper
    display flex
    justify-content space-between
    flex-wrap wrap
    margin 10px -10px -10px -10px
    #add-task
      animate()
      border-box()
      radius(30px)
      background-color $color-primary
      color white
      display block
      height 60px
      line-height 60px
      margin 10px
      overflow hidden
      padding 0 60px
      position relative
      text-align center
      // flex-basis calc(50% - 20px)
      flex-basis 100%
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
