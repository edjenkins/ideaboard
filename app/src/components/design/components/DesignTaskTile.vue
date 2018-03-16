<template lang="pug">

  router-link.design-dashboard--task(v-bind:to="{ name: task.type, params: { id: task._idea, task_id: task._id } }")
    .design-dashboard--task--title {{ task.title }}

    .design-dashboard--task--subtitle(v-if="task._responses.length > 0") {{ `${task._responses.length} contributon${(task._responses.length === 1) ? '' : 's'}` }}

    .design-dashboard--task--meta.design-dashboard--task--status  
      i.fas.fa-thumbtack(v-if="task.pinned" title="This task is pinned")
      i.fas.fa-lock(v-if="task.locked" title="This task is locked")

    .design-dashboard--task--meta.design-dashboard--task--type(v-bind:title="`${task.type} task`")
      i.fas(v-bind:class="[getTaskIcon(task.type)]")
    .design-dashboard--task--meta.design-dashboard--task--contributors
      avatar(v-for="(contributor, index) in contributors" v-bind:key="index" v-bind:profile="contributor._user.profile" v-if="index < 4")
      span(v-if="contributors.length > 1") {{ `+${(contributors.length - 1)} ${(contributors.length === 2) ? 'other' : 'others'}` }}
  
</template>

<script>
import _ from 'lodash'
import Avatar from '@/components/user/Avatar'

export default {
  name: 'design-task-tile',
  props: ['task'],
  components: {
    Avatar
  },
  computed: {
    contributors () {
      // return this.task._responses
      return _.sortedUniqBy(_.reverse(this.task._responses), (response) => {
        return response._user._id
      })
    }
  },
  methods: {
    loadTask () {
      this.$emit('loadTask')
    },
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
    }
  }
}
</script>

<style lang="stylus" scoped>

@import '~stylus/shared'

.design-dashboard--task
  animate()
  border-box()
  radius(10px)
  border 1px solid $color-border
  height 150px
  margin 10px
  overflow hidden
  position relative
  text-align center
  flex-basis 220px
  text-decoration none
  &:first-child
    flex 1 100%
  &:not(:first-child)
    flex 1 200px
  .design-dashboard--task--title, .design-dashboard--task--subtitle
    animate()
    reset()
    color $color-text-dark-grey
    font-size 1.2em
    font-weight bold
    text-align left
    padding 15px 40px 5px 15px
  .design-dashboard--task--title
    color $color-text-dark-grey
    line-height 24px
    max-height 48px
    overflow hidden
  .design-dashboard--task--subtitle
    color $color-text-light-grey
    font-size .8em
    font-weight bold
    padding 0 40px 0 15px
  .design-dashboard--task--meta
    pinned()
    animate()
    bottom auto
    top 0
    color $color-text-light-grey
    padding 5px
    position absolute
    &.design-dashboard--task--status
      bottom 0
      top auto
      left 50%
      padding 0 5px
      text-align right
    &.design-dashboard--task--type
      left 50%
      text-align right
      svg
        height 20px
        width 20px
    &.design-dashboard--task--contributors
      top auto
      left auto
      bottom 10px
      left 10px
      height 30px
      padding 0
      .avatar
        animate()
        float left
        height 30px
        position relative
        width 30px
        &:not(:first-child)
          margin-left -30px

      span
        animate()
        float left
        color $color-text-light-grey
        font-weight bold
        font-size .8em
        line-height 30px
        margin 0 10px 0 5px
      &:hover
        .avatar
          &:not(:first-child)
            margin-left 4px
        span
          opacity 0
    svg
      margin 5px
    p
      reset()
      font-size 0.8em
      padding 5px
  
  &:hover
    cursor pointer

</style>
