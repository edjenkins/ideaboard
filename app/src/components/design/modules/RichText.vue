<template lang="pug">
.design-task--richtext
  p.design-task--description(v-if="task.description") {{ task.description }}

  splash-messages(v-if="!isAuthenticated" v-bind:messages="[{type:'success',text:'Please login to participate!'}]")

  .responses
    .response-wrapper(v-for="(response, index) in responses" v-bind:key="index")
      .response-body.ql-container.ql-snow.ql-editor(v-html="response.response")
      .response-footer
        p.pull-left
          | Posted by 
          router-link(v-bind:to="{ name: 'profile', params: { id: response._user._id }}" v-bind:title="response._user.profile.name")
            | {{ response._user.profile.name }}
        //- router-link.avatar-wrapper(tag="div" v-bind:to="{ name: 'profile', params: { id: response._user._id }}" v-bind:title="response._user.profile.name")
          avatar.response--avatar(v-bind:profile="response._user.profile")
        ul.response--actions.pull-right(v-if="isAuthenticated")
          li.response--action(@click="reportOrDestroy('taskresponse', response._id, response._user._id)")
            | {{ (isModerator || user._id === response._user._id) ? 'delete' : 'report' }}
        .clearfix
  .richtext-wrapper(v-if="isAuthenticated")
    quill-editor(v-if="editing" v-model="newResponse" ref="myQuillEditor" v-bind:options="editorOption")
    br
    .btn.pull-left.action-btn(v-bind:class="{ 'btn-primary full-width': !editing, 'btn-danger': editing }" @click="editing =! editing") {{ editing ? 'Cancel' : 'Create a new response' }}
    .btn.btn-success.pull-right(v-if="editing" @click="submitResponse") Share Response
    .clearfix
  
</template>

<script>
import { mapGetters } from 'vuex'
import API from '@/api'

import 'quill/dist/quill.snow.css'
import { quillEditor } from 'vue-quill-editor'

import DesignTask from '@/mixins/DesignTask'
import Reportable from '@/mixins/Reportable'

import Avatar from '@/components/user/Avatar'

export default {
  name: 'richtext',
  mixins: [
    DesignTask,
    Reportable
  ],
  components: {
    quillEditor,
    Avatar
  },
  mounted () {
    this.fetchResponses()
  },
  data () {
    return {
      editing: false,
      newResponse: undefined,
      responses: []
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated']),
    editorOption () {
      return {
        placeholder: 'Write something here...',
        readOnly: false,
        scrollingContainer: false,
        modules: {
          toolbar: [
            [{'header': [1, 2, 3, 4, 5, 6, false]}],
            ['bold', 'italic', 'underline'],
            [{'list': 'ordered'}, {'list': 'bullet'}]
          ]
        }
      }
    }
  },
  methods: {
    contentChanged () {
      this.fetchResponses()
    },
    fetchResponses () {
      API.task.fetchResponses(
        'richtext',
        this.$route.params.task_id,
        (response) => {
          this.$log(response)
          this.responses = response.data
          if (this.responses.length === 0) {
            this.editing = true
          }
        },
        (error) => {
          this.$log(error)
        }
      )
    },
    submitResponse () {
      if (!this.isAuthenticated) return
      if (!this.newResponse || this.newResponse.length === 0) {
        alert('Please write something!')
        return
      }
      API.task.submitResponse(
        'richtext',
        this.$route.params.task_id,
        { response: this.newResponse },
        (response) => {
          this.$log(response)
          this.responses.push(response.data)
          this.newResponse = undefined
          this.editing = false
        },
        (error) => {
          this.$log(error)
        }
      )
    }
  }
}
</script>

<style lang="stylus" scoped>

@import '~stylus/shared'

.design-task--richtext
  background-color white
  padding 25px
  .richtext-wrapper
    position relative
    .quill-editor
      border $color-border 1px solid
      padding 0
  
  .responses
    .response-wrapper
      margin-bottom 20px
      &:first-child
        margin-top 20px
      .response-footer
        padding 10px
        
        ul.response--actions
          cleanlist()
          margin 0 -10px 0 -10px
          li.response--action
            animate()
            cleanlist()
            color $color-text-light-grey
            float left
            font-size 0.9em
            margin 0 10px
            &:hover, &.active
              color $color-primary
              cursor pointer

        .avatar
          display inline-block
          height 40px
          width 40px
        p
          reset()
          color $color-text-grey
          font-size 0.9em
          font-weight bold
          a
            color $color-text-grey
            text-decoration none

      .response-body
        padding 10px

</style>
