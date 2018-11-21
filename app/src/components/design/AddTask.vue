<template lang="pug">
.design-task--add
  form

    .task-wrapper

      splash-messages(v-if="task.type && splashmessages['task'].length" v-bind:messages="splashmessages['task']" padded)

      .input-wrapper
        label(title="Give your task a snappy title") Title
        input(type="text" v-model="task.title" placeholder="Give your task a name" name="title" autofocus="autofocus")
      .input-wrapper(v-show="task.title.length > 3")
        label(title="Futher details that will help people particpate") Description 
        input(v-model="task.description" name="description" placeholder="Add a detailed description to your task" v-on:keyup.enter="addTask")

      .input-wrapper
        label(title="Type of task") Type
        ul.task-types
          li.task-types--type(v-for="(type, key) in types" v-bind:key="key" v-bind:value="key" @click="task.type = key" v-bind:class="{ active: task.type && key === task.type }")
            i.fas(v-bind:class="type.icon")
            | {{ type.name }}
          .clearfix

        p.type-tip(v-if="task.type") {{ types[task.type].description }}

      .input-wrapper(v-show="task.title.length > 3")
        label.clickable(@click="showAdvancedOptions = !showAdvancedOptions")
          | Advanced options
          i.fas.fa-chevron-up(v-show="showAdvancedOptions")
          i.fas.fa-chevron-down(v-show="!showAdvancedOptions")
        #advanced-options(v-if="showAdvancedOptions")
          label Pin this task
            input(type="checkbox" v-model="task.pinned")
            span This will keep it at the top of the dashboard page

          label Lock this task
            input(type="checkbox" v-model="task.locked")
            span This means only you will be able to add responses to it

      .input-wrapper
        router-link.btn.btn-danger.pull-left(tag="div" v-bind:to="{ name: 'designdashboard' }") Back
        .btn.btn-success.pull-right#add-task-btn(@click="addTask" v-if="task.type") {{ (addingTask) ? 'Please wait...' : 'Add Task' }}
        .clearfix
</template>

<script>
import API from '@/api'
import SplashMessages from '@/components/shared/SplashMessages'

export default {
  name: 'add-task',
  components: {
    SplashMessages
  },
  props: ['idea'],
  mounted () {
    this.$emit('update:title', 'Add Task')
  },
  data () {
    return {
      showAdvancedOptions: false,
      addingTask: false,
      types: {
        discussion: { name: 'Chat', icon: 'fa-comments', description: 'Chats are great for having free flowing conversations with your community. They can be used to voice opinions or just have a natter!' },
        media: { name: 'Media', icon: 'fa-images', description: 'A place to share images, videos and documents with your community.' },
        poll: { name: 'Poll', icon: 'fa-list-ul', description: 'Polls are great when you have a set question with a set of options for which you would like to gather opinions.' },
        richtext: { name: 'Rich Text', icon: 'fa-font', description: 'Need to jot something down? The \'Rich Text\' task gives you a notepad for your ideas which everyone can see.' },
        appearin: { name: 'Video Call', icon: 'fa-users', description: 'Have a live video chat with someone via Jitsi.' },
        whiteboard: { name: 'Whiteboard', icon: 'fa-paint-brush', description: 'Sketch ideas on an interactive whiteboard.' },
        webcam: { name: 'Record Video', icon: 'fa-video', description: 'Record videos through your webcam and share them.' }
      },
      task: {
        title: '',
        description: '',
        icon: '',
        type: '',
        pinned: false,
        locked: false
      },
      splashmessages: {
        task: [],
        title: [],
        description: []
      }
    }
  },
  methods: {
    addTask () {
      if (this.addingTask) return
      this.addingTask = true
      API.task.add(
        { task: this.task, idea_id: this.idea._id },
        (response) => {
          this.$log(response)
          this.addingTask = false
          if (response.data.errors) {
            this.splashmessages.task = response.data.errors
          } else {
            this.$router.push({ name: response.data.task.type, params: { task_id: response.data.task._id } })
          }
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
  p.type-tip
    reset()
    color $color-text-grey
    font-size 0.9em
    max-width 480px
    padding 10px
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
        svg
          margin 0 5px
          position relative
          top 1px
        span
          color $color-text-grey
          display block
          font-size 0.8em
      ul.task-types
        cleanlist()
        display inline-block
        margin -5px
        li.task-types--type
          animate()
          cleanlist()
          radius(25px)
          border $color-border 1px solid
          color $color-text-grey
          float left
          font-weight bold
          line-height 30px
          margin 5px
          min-width 70px
          padding 10px 40px 10px 45px
          position relative
          text-align left
          text-overflow ellipsis
          white-space nowrap
          svg
            position absolute
            left 15px
            top 16px
          &:hover
            background-color $color-lighter-grey
            cursor pointer
          &.active
            background-color $color-primary
            border-color $color-primary
            color white
          @media(max-width: 568px)
            width calc(100% - 90px)
          

</style>
