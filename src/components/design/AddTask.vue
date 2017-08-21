<template lang="pug">
.design-task--add
  form
    .input-wrapper
      ul.task-types
        li.task-types--type(v-for="(type, key) in types" v-bind:key="key" v-bind:value="key" @click="task.type = key" v-bind:class="{ active: key === task.type }") {{ type.name }}
        .clearfix
      p.type-tip Tip: {{ types[task.type].description }}

    hr

    .input-wrapper
      label Title
        span The question you would like to ask
      input(type="text" v-model="task.title" name="title" placeholder="Task title")
    .input-wrapper
      label Description 
        span Futher details that will help people particpate
      input(v-model="task.description" name="description" placeholder="Task description" v-on:keyup.enter="addTask")
    .input-wrapper
      label(@click="showAdvancedOptions = !showAdvancedOptions")
        | Advanced options
        icon(v-bind:name="showAdvancedOptions ? 'chevron-up' : 'chevron-down'")
      #advanced-options(v-if="showAdvancedOptions")
        label Pin this task
          input(type="checkbox" v-model="task.pinned")
          span This will keep it at the top of the dashboard page

        label Lock this task
          input(type="checkbox" v-model="task.locked")
          span This means only you will be able to add responses to it

    .input-wrapper
      .btn.btn-success.pull-left#add-task-btn(@click="addTask") {{ (addingTask) ? 'Please wait...' : 'Create ' + task.type }}
      .clearfix
</template>

<script>
import API from '@/api'
import Icon from 'vue-awesome/components/Icon'
import 'vue-awesome/icons/chevron-up'
import 'vue-awesome/icons/chevron-down'

export default {
  name: 'add-task',
  components: {
    Icon
  },
  props: ['idea'],
  data () {
    return {
      showAdvancedOptions: false,
      addingTask: false,
      types: {
        discussion: { name: 'Chat', description: 'A Discussion is great for having free flowing conversations with your community. It can be used to guage opinions or just to have a chat!' },
        poll: { name: 'Poll', description: 'A Poll is great for tasks where there is a defined question with a set of options that you would like to gather the communities opinions around.' }
        // media: { name: 'Media', description: 'A Media task is useful when you need people to submit photos, videos or documents as a response.' }
      },
      task: {
        title: undefined,
        description: undefined,
        type: 'discussion',
        pinned: false,
        locked: false
      }
    }
  },
  methods: {
    goBack () {
      this.$emit('back')
    },
    addTask () {
      if (this.addingTask) return
      this.addingTask = true
      API.task.add(
        { task: this.task, idea_id: this.idea._id },
        (response) => {
          this.$log(response)
          this.goBack()
          this.addingTask = false
        },
        (error) => {
          this.$log(error)
          this.addingTask = false
          alert('There was a problem')
        }
      )
    }
  }
}
</script>

<style lang="stylus" scoped>

@import '~stylus/shared'

.design-task--add
  background-color white
  padding 25px
  form
    margin -10px
    .input-wrapper
      #advanced-options
        border-left $color-border 3px solid
        padding-left 15px
        label input
          margin 10px
      #add-task-btn
        text-transform capitalize
      label
        font-size 0.9em
        font-weight bold
        margin 10px 0
        .fa-icon
          margin 0 5px
          position relative
          top 1px
        span
          color $color-text-grey
          display block
          font-size 0.8em
      p.type-tip
        reset()
        color $color-text-grey
        font-size 0.9em
        max-width 480px
        padding 10px 0
      ul.task-types
        cleanlist()
        display inline-block
        margin -5px
        li.task-types--type
          animate()
          cleanlist()
          color $color-text-grey
          float left
          line-height 50px
          margin 5px
          padding 0 30px
          min-width 30px
          outline $color-border 1px solid
          outline-offset -1px
          text-align center
          white-space nowrap
          &:hover
            cursor pointer
            background-color $color-lighter-grey
          &.active
            background-color $color-primary
            color white
            outline $color-primary 1px solid

</style>
