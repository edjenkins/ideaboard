<template lang="pug">
  #start-idea
    page-header(title="Create an Idea" subtitle="This is where it begins, start an Idea, invite some friends and begin designing!")
    .row
      .content-block.content-block--main.pull-up.pull-left.white-block
        .content-block--body
          form
            splash-messages(v-bind:messages="splashmessages" padded)

            splash-messages(v-if="$route.query.idea" v-bind:messages="[{type:'success', text: `You are starting a follow on idea. Subscribers of the original idea will be invited to participate.` }]" padded)

            .input-wrapper(v-if="categories.length > 0")
              label Category
              category-selector(v-bind:category.sync="idea.category" v-bind:category_name.sync="idea.category_name" v-bind:categories="categories")

            .input-wrapper
              label Title
              input(type="text" v-model="idea.title" name="title" placeholder="Give your idea a title")
            
            .input-wrapper
              label Tagline
              input(type="text" v-model="idea.tagline" name="tagline" placeholder="A short summary of your idea")
            
            .input-wrapper
              label Description
              quill-editor(v-model="idea.description" ref="myQuillEditor" v-bind:options="editorOption")
            
            .input-wrapper
              label Banner Image
              ul.upload-options
                li.upload-options--option(@click="idea.uploadType = 'unsplash'" v-bind:class="{ 'active': (idea.uploadType === 'unsplash') }") Search
                li.upload-options--option(@click="idea.uploadType = 'upload'" v-bind:class="{ 'active': (idea.uploadType === 'upload') }") Upload
                .clearfix
              unsplash-search(v-if="idea.uploadType === 'unsplash'" v-bind:selected-image.sync="idea.banner")
              file-upload(v-if="idea.uploadType === 'upload'" v-bind:uploaded-file.sync="idea.banner")

        .content-block--footer
          .btn.btn-danger-subtle.pull-left(@click="startOver") Reset
          .btn.btn-success.pull-right(@click="startIdea")
            span(v-if="creatingIdea") Creating Idea...
            span(v-else) Continue
          .clearfix

      .content-block.content-block--side.pull-up.pull-right
        idea-tile(v-bind:idea="ideaTile")
      .clearfix

</template>

<script>
import API from '@/api'
import * as types from '@/store/mutation-types'
import _isEmpty from 'lodash/isEmpty'
import { mapGetters } from 'vuex'

import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'

import SplashMessages from '@/components/shared/SplashMessages'
import UnsplashSearch from '@/components/UnsplashSearch'
import FileUpload from '@/components/FileUpload'
import PageHeader from '@/components/PageHeader'
import IdeaTile from '@/components/ideas/IdeaTile'
import CategorySelector from '@/components/categories/CategorySelector'

export default {
  name: 'start-idea',
  metaInfo: {
    title: 'Start Idea'
  },
  components: {
    SplashMessages,
    CategorySelector,
    quillEditor,
    UnsplashSearch,
    FileUpload,
    PageHeader,
    IdeaTile
  },
  mounted () {
    this.fetchCategories()
    if (!this.$session.exists()) this.$session.start()
    if (this.$session.has('draft-idea')) {
      const draftIdea = JSON.parse(this.$session.get('draft-idea'))
      if (!_isEmpty(draftIdea)) {
        this.$set(this.idea, 'title', draftIdea.title)
        this.$set(this.idea, 'tagline', draftIdea.tagline)
        this.$set(this.idea, 'description', draftIdea.description)
        this.$set(this.idea, 'banner', draftIdea.banner)
        this.$set(this.idea, 'uploadType', draftIdea.uploadType)
      }
    }
  },
  watch: {
    'idea': {
      handler: function (nV, oV) {
        this.ideaTile = nV
        this.$set(this.ideaTile, nV)
        if (!this.$session.exists()) this.$session.start()
        this.$log('Saving draft...')
        this.$session.set('draft-idea', JSON.stringify(nV))
        console.log('Idea updated')
        console.log(JSON.parse(this.$session.get('draft-idea')))
      },
      deep: true
    }
  },
  data () {
    return {
      categories: [],
      ideaTile: undefined,
      editorOption: {
        theme: 'bubble',
        placeholder: 'Describe your idea in more detail',
        modules: {
          toolbar: [
            [{ 'size': ['small', false, 'large'] }],
            ['bold', 'italic'],
            ['link']
          ]
        }
      },
      selectedImage: undefined,
      creatingIdea: false,
      idea: {
        category: undefined,
        title: undefined,
        tagline: undefined,
        description: undefined,
        banner: undefined,
        uploadType: undefined
      },
      splashmessages: []
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated']),
    editor () {
      return this.$refs.myQuillEditor.quill
    }
  },
  methods: {
    fetchCategories () {
      API.category.fetchCategories(
        (response) => {
          // Idea success
          this.$log(response)
          this.categories = response.data
        },
        (error) => {
          // Idea fail
          this.$log(error)
        })
    },
    startOver () {
      this.splashmessages = []
      this.idea = {
        title: undefined,
        tagline: undefined,
        description: undefined,
        banner: undefined
      }
    },
    startIdea () {
      if (!this.isAuthenticated) {
        this.$store.commit(types.SHOW_AUTH_MODAL)
      }
      if (this.creatingIdea) return
      this.creatingIdea = true
      // If an idea id was passed, set the parent of the idea to be created
      this.idea._parent = this.$route.query.idea
      API.idea.start({ idea: this.idea, uploadType: this.idea.uploadType },
        (response) => {
          // Idea redirect
          this.$log(response)
          setTimeout(() => { this.creatingIdea = false }, 500)
          if (response.data.errors) {
            this.splashmessages = response.data.errors
          } else {
            this.$router.push({ name: 'idea', params: { id: response.data.idea._id } })
          }
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

#start-idea
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

  .quill-editor
    border $color-border 1px solid
    padding 2px

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
