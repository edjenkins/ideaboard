<template lang="pug">
  #outcome-document
    
    splash-messages(v-if="!canEdit" v-bind:messages="[{type:'success',text:'Only the idea creator can edit this document!'}]" padded)

    #document-preview.ql-container.ql-snow.ql-editor(v-if="!editing && document.text" v-html="document.text")
    
    quill-editor(v-if="editing" v-model="document.text" ref="myQuillEditor" v-bind:options="editorOption")

    #editor-actions
      
      dropdown(v-if="editing" ref="dropdown" v-bind:class-name="'custom'")
        template(slot="btn") Embed a task
        template(slot="body")
          ul
            li(v-for="(type, key) in embeddableTasks")
              dropdown(:trigger="'hover'" :role="'sublist'" :align="'right'")
                template(slot="btn")
                  label {{ key }}
                template(slot="body")
                  ul
                    li.dropdown-option(v-for="(task, index) in embeddableTasks[key]" @click="selectTask(task)")
                      label {{ `${task.title}${(task._user) ? ` - ${task._user.profile.name}` : ''}` }}

      .btn.pull-left(v-if="canEdit" v-bind:class="{ 'btn-primary full-width': !editing, 'btn-danger': editing }" @click="undoChanges") {{ editing ? 'Undo' : 'Start Editing' }}
      .btn.btn-success.pull-right(v-if="editing" @click="updateDocument") Save Changes
      .clearfix

</template>

<script>
import API from '@/api'
import { mapGetters } from 'vuex'
import Dropdown from 'bp-vuejs-dropdown'
import _groupBy from 'lodash/groupBy'

import Promise from 'bluebird'

import 'quill/dist/quill.snow.css'
import Quill from 'quill'
import { quillEditor } from 'vue-quill-editor'
import { TaskBlot, PollBlot } from '@/quill/customblots'
import SplashMessages from '@/components/shared/SplashMessages'

TaskBlot.blotName = 'ib-task'
TaskBlot.tagName = 'div'
TaskBlot.className = 'ib-task'
Quill.register(TaskBlot)

PollBlot.blotName = 'ib-poll'
PollBlot.tagName = 'div'
PollBlot.className = 'ib-poll'
Quill.register(PollBlot)

export default {
  name: 'document',
  props: ['idea', 'title'],
  components: {
    SplashMessages,
    quillEditor,
    Dropdown
  },
  mounted () {
    this.$emit('update:title', 'Idea Document')
    this.getDocument()
    this.loadTasks()
  },
  data () {
    return {
      document: {
        text: ''
      },
      editing: false,
      loadingTasks: false,
      tasks: []
    }
  },
  computed: {
    ...mapGetters(['user']),
    canEdit () {
      if ((typeof this.idea === 'undefined') || (typeof this.user === 'undefined') || (typeof this.idea._user === 'undefined')) return false
      return this.idea._user._id === this.user._id
    },
    embeddableTasks () {
      return _groupBy(this.tasks, 'type')
    },
    editorOption () {
      return {
        placeholder: 'Write about the outcome of your idea',
        readOnly: false,
        scrollingContainer: false,
        modules: {
          toolbar: [
            [{'header': [1, 2, 3, 4, 5, 6, false]}],
            ['bold', 'italic', 'underline'],
            [{'list': 'ordered'}, {'list': 'bullet'}]
            // [{'script': 'sub'}, {'script': 'super'}],
            // [{'indent': '-1'}, {'indent': '+1'}],
            // [{'size': ['small', false, 'large', 'huge']}],
            // [{'color': []}, {'background': []}],
            // [{'font': []}],
            // ['clean']
          ]
        }
      }
    }
  },
  methods: {
    selectTask (task) {
      this.$refs.dropdown.isHidden = true
      this.embedTask(task)
    },
    embedTask: async function (embedTask) {
      let embedIndex = this.$refs.myQuillEditor.quill.getSelection(true).index

      const quill = this.$refs.myQuillEditor.quill

      quill.insertText(embedIndex, '\n')
      embedIndex += 1

      quill.removeFormat(embedIndex)

      const title = (embedTask.title) ? embedTask.title : 'No title given'
      quill.insertText(embedIndex, `${title}\n`, { 'color': '#000', 'size': 'large' })
      embedIndex += title.length + 1

      const description = (embedTask.description) ? embedTask.description : 'No description given'
      quill.insertText(embedIndex, `${description}\n`, { 'color': '#666', 'size': 'normal' })
      embedIndex += description.length + 1

      switch (embedTask.type) {
        case 'poll':
          const responsesPromise = new Promise((resolve) => {
            API.task.fetchResponses(
              embedTask.type,
              embedTask._id,
              (response) => {
                console.log(response)
                resolve(response.data)
              },
              (error) => {
                console.log(error)
                resolve([])
              }
            )
          })

          responsesPromise.then((responses) => {
            if (responses.length === 0) {
              const message = 'No responses!'
              quill.insertText(embedIndex, `${message}\n\n`, { 'color': 'red', 'size': 'normal' })
              embedIndex += message.length + 2
            }
            responses.forEach((embedResponse) => {
              const beforeLen = quill.getLength()
              quill.insertEmbed(embedIndex, 'ib-poll', { user: embedResponse._user.profile.name, avatar: embedResponse._user.profile.avatar, text: embedResponse.response.text })
              const afterLen = quill.getLength()
              embedIndex += (afterLen - beforeLen)
            })
            this.$refs.myQuillEditor.quill.setSelection(embedIndex, 0)
          })
          break

        default:
          const beforeLen = quill.getLength()
          quill.insertEmbed(embedIndex, 'ib-task', { idea_id: embedTask._idea._id, task_id: embedTask._id, task_type: embedTask.type })
          const afterLen = quill.getLength()
          embedIndex += (afterLen - beforeLen)
          this.$refs.myQuillEditor.quill.setSelection(embedIndex, 0)
          break
      }
    },
    getDocument () {
      this.document.text = ''
      if (this.editing) return
      API.document.fetchDocuments(
        this.idea._id,
        (response) => {
          console.log(response)
          this.document = response.data
          if (this.document.text.length === 0) {
            this.editing = true
          }
        },
        (response) => {
          console.log(response)
        }
      )
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
    undoChanges () {
      this.editing = !this.editing
      if (!this.editing) {
        this.getDocument()
      }
    },
    updateDocument () {
      API.document.update(
        this.document,
        (response) => {
          console.log(response)
          this.editing = false
        },
        (response) => {
          console.log(response)
        }
      )
    }
  }
}
</script>

<style lang="stylus">

@import '~stylus/shared'

#outcome-document
  
  .quill-editor
    border $color-border 1px solid
    margin 20px
    padding 0

  .ib-poll
    background-color $color-lightest-grey
    border-left $color-primary 4px solid
    margin 10px 0
    padding 0 10px
    .avatar
      radius(50%)
      height 30px
      width 30px
      float left
    h4
      reset()
      font-size 1.4em
      margin 0 0 10px 0
    h5
      reset()
      color $color-text-grey
      font-weight normal
      float left
      font-size 1em
      height 30px
      line-height 30px
      margin 0 10px

  #document-preview
    border none
    margin 10px

  .custom-bp__btn
    border $color-border 1px solid !important
    margin-bottom 20px
    padding 8px 15px !important

  .bp-dropdown__body
    padding 0 !important
    ul, li
      cleanlist()
      text-transform capitalize
      label
        display block
        padding 8px 15px
        &:hover
          background-color $color-lightest-grey
          cursor pointer

  #editor-actions
    padding 20px
    .btn
      display inline-block
      margin-top 10px
      margin-right 10px

  .splash-messages
    padding 20px
</style>
