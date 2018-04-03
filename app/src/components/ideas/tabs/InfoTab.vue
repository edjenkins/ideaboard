<template lang="pug">
.tab-content--info
  .tab--content
    .ql-container.ql-bubble.ql-editor(v-if="!editing" v-html="idea.description")

    quill-editor(v-if="editing" v-model="idea.description" ref="myQuillEditor" v-bind:options="editorOption")

    //- .btn-edit-fab(v-show="!editing" @click="editing = true")
    //-   i.fas.fa-pencil-alt
    //- .btn-edit-fab(v-show="editing" @click="editing = false")
    //-   i.fas.fa-times

  .tab--footer
    subscribe-button(v-bind:idea="idea" v-on:subscribed="$emit('show-design')")

  #general-discussion
    discussion(v-bind:idea="idea" v-bind:hide-no-comments="true" v-bind:task="{ title: 'discussion', component: 'discussion' }")

  //- #design-banner(@click="viewDesign()")
    span(v-if="idea._subscribers.length > 2") Join {{ idea._subscribers.length }} people in disscussing this idea!
    span(v-else) Join the discussion
    i.fas.fa-long-arrow-alt-right
    

</template>

<script>
import { mapGetters } from 'vuex'

import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'

import SubscribeButton from '@/components/ideas/actions/SubscribeButton'
import Discussion from '@/components/design/modules/Discussion'
import IdeaTile from '@/components/ideas/IdeaTile'

export default {
  name: 'info-tab',
  props: ['idea'],
  components: {
    quillEditor,
    SubscribeButton,
    Discussion,
    IdeaTile
  },
  data () {
    return {
      editing: false,
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
      }
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'user', 'instanceBackground']),
    ownIdea () {
      return this.isAuthenticated && (this.user._id === this.idea._user._id)
    }
  },
  methods: {
    viewDesign () {
      this.$emit('show-design')
    }
  }
}
</script>

<style lang="stylus" scoped>

@import '~stylus/shared'

.tab-content--info
  background-color white
  text-align left
  .tab--content
    padding 15px
    position relative
    p
      reset()
    .btn-edit-fab
      radius(50%)
      background-color $color-grey
      height 50px
      position absolute
      bottom 15px
      right 15px
      width 50px
      text-align center
      &:hover
        background-color darken($color-grey, 10%)
        cursor pointer
      svg
        color white
        height 50px
        width 20px

  .tab--footer
      display none
      padding 20px
  @media(max-width: 680px)
    .tab--footer
      padding-top 0
      display block

  #general-discussion
    border-top $color-border 1px dashed

  #design-banner
    animate()
    background-color $color-design
    color white
    font-size 1em
    font-weight bold
    line-height 20px
    padding 20px 20px
    padding-right 60px
    position relative
    @media(max-width: 680px)
      display none
    svg
      animate()
      color white
      position absolute
      top 0
      right 0
      padding 15px
      width 30px
      height 30px
    &:hover
      cursor pointer
      background-color darken($color-design, 5%)
      svg
        right -5px

  // Edit mode
  .quill-editor
    border-left $color-primary 3px solid
    padding 0

</style>
