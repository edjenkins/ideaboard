<template lang="pug">
  #outcome-document

    #document-preview.ql-container.ql-snow.ql-editor(v-if="!editing && document.text" v-html="document.text")
    
    quill-editor(v-if="editing" v-model="document.text" ref="myQuillEditor" v-bind:options="editorOption")

    #editor-actions
      .btn.btn-primary(v-if="canEdit" @click="editing = true") Start Editing
      
      dropdown(v-if="editing" ref="dropdown" v-bind:class-name="'custom'")
        template(slot="btn") Select task to embed
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

      .btn.btn-danger(v-if="editing" @click="undoChanges") Undo
      .btn.btn-success(v-if="editing" @click="updateDocument") Save Changes


</template>

<script>
import API from '@/api'
import { mapGetters } from 'vuex'
import Dropdown from 'bp-vuejs-dropdown'
import _groupBy from 'lodash/groupBy'
import _get from 'lodash/get'

import 'quill/dist/quill.snow.css'
import Quill from 'quill'
import { quillEditor } from 'vue-quill-editor'
import Promise from 'bluebird'

let Embed = Quill.import('blots/embed')

class TaskBlot extends Embed {
  static create (value) {
    let node = super.create()
    node.setAttribute('idea-id', value.idea_id)
    node.setAttribute('task-id', value.task_id)

    node.contenteditable = false

    let link = document.createElement('div')
    link.title = link.href = `/idea/${value.idea_id}/design/${value.task_type}/${value.task_id}`
    link.target = '_blank'
    link.setAttribute('class', 'btn btn-primary')
    link.appendChild(document.createTextNode(`Link to ${value.task_type}...`))

    node.appendChild(link)

    return node
  }

  static value (node) {
    return {
      idea_id: node.getAttribute('idea-id'),
      task_id: node.getAttribute('task-id'),
      task_type: node.getAttribute('task-type')
    }
  }
}

class PollBlot extends Embed {
  static create (value) {
    let node = super.create()
    node.setAttribute('user', value.user)
    node.setAttribute('avatar', value.avatar)
    node.setAttribute('text', value.text)

    node.contenteditable = false

    let valueText = document.createElement('h4')
    valueText.appendChild(document.createTextNode(value.text))
    node.appendChild(valueText)

    let avatar = document.createElement('img')
    avatar.setAttribute('src', value.avatar)
    avatar.setAttribute('height', '60px')
    avatar.setAttribute('width', '60px')
    avatar.setAttribute('class', 'avatar')
    node.appendChild(avatar)

    let user = document.createElement('h5')
    user.appendChild(document.createTextNode(`Suggested by ${value.user}`))
    node.appendChild(user)

    let clearfix = document.createElement('div')
    clearfix.setAttribute('class', 'clearfix')
    node.appendChild(clearfix)

    return node
  }

  static value (node) {
    return {
      user: node.getAttribute('user'),
      avatar: node.getAttribute('avatar'),
      text: node.getAttribute('text')
    }
  }
}

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
    quillEditor,
    Dropdown
  },
  mounted () {
    this.$emit('update:title', 'Document Idea')
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
    ownIdea () {
      return true || _get(this.idea, 'user._id') === _get(this.user, '_id', 'anonymous')
    },
    canEdit () {
      return !this.editing && this.ownIdea
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
          quill.insertEmbed(embedIndex, 'ib-task', { idea_id: embedTask._idea, task_id: embedTask._id, task_type: embedTask.type })
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
      this.editing = false
      this.getDocument()
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

  // Quill editor
  .quill-editor
    padding 10px
    .ql-toolbar.ql-snow, .ql-container.ql-snow
      border none
    .ql-toolbar.ql-snow
      border-bottom $color-border 1px solid


</style>
