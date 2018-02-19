<template lang="pug">
.design-dashboard

  .design-dashboard--tasks
    .design-dashboard--task(v-for="(task, index) in orderedTasks" v-bind:key="index" @click="loadTask(task)")
      .design-dashboard--task--title {{ task.title }}
      .design-dashboard--task--meta.design-dashboard--task--status  
        i.fas.fa-thumbtack(v-if="task.pinned")
        i.fas.fa-lock(v-if="task.locked")
      .design-dashboard--task--meta.design-dashboard--task--type
        i.fas(v-bind:class="[getTaskIcon(task.type)]")

    .design-dashboard--task#add-task(@click="addTask()")
      .design-dashboard--task--title
        i.fas.fa-plus
  .clearfix

</template>

<script>
import _ from 'lodash'
import API from '@/api'

export default {
  name: 'dashboard',
  props: ['activeTask', 'idea'],
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
    getTaskIcon (type) {
      switch (type) {
        case 'poll':
          return 'fa-list-ul'
        case 'discussion':
          return 'fa-comments'
        case 'media':
          return 'fa-images'
        case 'appearin':
          return 'fa-video'
        case 'whiteboard':
          return 'fa-paint-brush'
        default:
          break
      }
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
    margin -10px
    .design-dashboard--task
      animate()
      outline $color-border 1px solid
      outline-offset -1px
      float left
      height 140px
      margin 10px
      overflow hidden
      position relative
      text-align center
      width calc((100% / 3) - 20px)
      @media(max-width: 780px)
        width calc((100% / 2) - 20px)
      @media(max-width: 480px)
        width calc((100% / 1) - 20px)
      
      .design-dashboard--task--title
        animate()
        center-align()
        color $color-text-dark-grey
        font-weight bold
      .design-dashboard--task--meta
        pinned()
        animate()
        bottom auto
        top 0
        color $color-text-light-grey
        padding 5px
        position absolute
        &.design-dashboard--task--status
          right 50%
          text-align left
        &.design-dashboard--task--type
          left 50%
          text-align right
        svg
          margin 5px
        p
          reset()
          font-size 0.8em
          padding 5px
      
      &:hover
        background-color $color-lightest-grey
        cursor pointer

      &#add-task
        background-color white
        color $color-grey
        outline $color-border 2px dashed
        outline-offset -2px
        .design-dashboard--task--title
          color $color-grey
          svg
            height 25px
        &:hover
          background-color $color-lightest-grey
          .design-dashboard--task--title
            color darken($color-grey, 10%)

</style>
