<template lang="pug">
  #create-idea
    page-header(title="Create Idea" subtitle="This is where it begins, create your idea, invite some friends and start designing")
    .row
      .content-block.content-block--main.pull-up.pull-left.white-block
        .content-block--body
          form
            .input-wrapper
              label Idea Title
              input(type="text" v-model="idea.title" name="title" placeholder="Idea Title")
            .input-wrapper
              label Idea Tagline
              input(type="text" v-model="idea.tagline" name="tagline" placeholder="Idea Tagline")
            .input-wrapper
              label Idea Description
              quill-editor(v-model="idea.description" ref="myQuillEditor" v-bind:options="editorOption")
            .input-wrapper
              label Idea Banner
              input(type="hidden" v-model="idea.banner" name="banner")
              input(type="hidden" v-model="uploadType" name="uploadType")
              ul.upload-options
                li.upload-options--option(@click="uploadType = 'unsplash'" v-bind:class="{ 'active': (uploadType === 'unsplash') }") Browse
                li.upload-options--option(@click="uploadType = 'upload'" v-bind:class="{ 'active': (uploadType === 'upload') }") Upload
                .clearfix
              unsplash-search(v-if="uploadType === 'unsplash'" v-bind:selected-image.sync="idea.banner")
              file-upload(v-if="uploadType === 'upload'" v-bind:uploaded-file.sync="idea.banner")

        .content-block--footer
          .btn.btn-danger-subtle.pull-left(@click="startOver") Reset
          .btn.btn-success.pull-right(@click="createIdea")
            span(v-if="creatingIdea") Creating Idea...
            span(v-else) Continue
          .clearfix
      .content-block.content-block--side.pull-up.pull-right
        idea-tile(v-bind:idea="idea" v-if="idea.title || idea.tagline || idea.description || idea.banner")
      .clearfix
</template>

<script>
import API from '@/api'
import * as types from '@/store/mutation-types'
import Quill from 'quill'
import { quillEditor } from 'vue-quill-editor'
import _isEmpty from 'lodash/isEmpty'
import { mapGetters } from 'vuex'

import UnsplashSearch from '@/components/UnsplashSearch'
import FileUpload from '@/components/FileUpload'
import PageHeader from '@/components/PageHeader'
import IdeaTile from '@/components/ideas/IdeaTile'

export default {
  name: 'create-idea',
  metaInfo: {
    title: 'Create Idea'
  },
  components: {
    Quill,
    quillEditor,
    UnsplashSearch,
    FileUpload,
    PageHeader,
    IdeaTile
  },
  created () {
    if (!this.$session.exists()) this.$session.start()
    if (this.$session.has('draft-idea')) {
      const draftIdea = JSON.parse(this.$session.get('draft-idea'))
      console.log(draftIdea)
      if (!_isEmpty(draftIdea)) this.idea = draftIdea
    }
  },
  watch: {
    'idea': {
      handler: function (nV, oV) {
        if (!this.$session.exists()) this.$session.start()
        this.$log(nV)
        this.$log('Saving draft...')
        this.$session.set('draft-idea', JSON.stringify(nV))
      },
      deep: true
    }
  },
  data () {
    return {
      content: '<h2>I am Example</h2>',
      editorOption: {
        modules: {
          toolbar: [
            [{ 'size': ['small', false, 'large'] }],
            ['bold', 'italic'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['link']
          ]
        }
      },
      uploadType: undefined,
      selectedImage: undefined,
      creatingIdea: false,
      idea: {
        title: undefined,
        tagline: undefined,
        description: undefined,
        banner: undefined
      }
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated']),
    editor () {
      return this.$refs.myQuillEditor.quill
    }
  },
  methods: {
    startOver () {
      this.idea = {
        title: undefined,
        tagline: undefined,
        description: undefined,
        banner: undefined
      }
    },
    createIdea () {
      if (!this.isAuthenticated) {
        this.$store.commit(types.SHOW_AUTH_MODAL)
      }
      if (this.creatingIdea) return
      this.creatingIdea = true
      API.idea.create({ idea: this.idea, uploadType: this.uploadType },
        (response) => {
          // Idea redirect
          this.$log(response)
          setTimeout(() => { this.creatingIdea = false }, 500)
          this.$router.push(`/idea/${response.data.idea._id}`)
        },
        (error) => {
          // Idea fail
          this.$log(error)
          setTimeout(() => { this.creatingIdea = false }, 500)
        })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~stylus/shared'

#create-idea
  text-align center
  h1, h2
    reset()
    color $color-text-grey
    font-weight normal 
  .content-block--side
    margin-bottom 30px
    padding 0
    width 280px
    @media(max-width: 660px)
      display none
  .content-block--main
    margin-bottom 30px
    width calc(100% - 300px)
    @media(max-width: 660px)
      width 100%

  ul.upload-options
    cleanlist()
    margin 10px -5px
    li.upload-options--option
      cleanlist()
      animate()
      color $color-text-grey
      float left
      margin 5px
      line-height 50px
      outline $color-border 1px solid
      text-align center
      width calc(calc(280px / 2) - 5px)
      &:hover
        cursor pointer
        background-color $color-lightest-grey
      &.active
        background-color $color-success
        color white
        outline $color-success 1px solid
</style>
