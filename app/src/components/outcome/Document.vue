<template lang="pug">
  #outcome-document
    quill-editor(v-model="outcome" ref="myQuillEditor" v-bind:options="editorOption")
</template>

<script>
import Quill from 'quill'
import { quillEditor } from 'vue-quill-editor'

export default {
  name: 'doocument',
  props: ['idea', 'title'],
  components: {
    Quill,
    quillEditor
  },
  created () {
    this.$emit('update:title', 'Outcome Document')
  },
  data () {
    return {
      editorOption: {
        placeholder: 'A longer description to explain your idea in detail',
        modules: {
          toolbar: [
            [{ 'size': ['small', false, 'large'] }],
            ['bold', 'italic'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['link']
          ]
        }
      },
      outcome: ''
    }
  }
}
</script>

<style lang="stylus" scoped>

@import '~stylus/shared'

#document
  padding 20px
</style>
