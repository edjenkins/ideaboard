<template lang="pug">

li.media-item(v-bind:class="{ 'comments-visible': commentsVisible }")
  .details
    .details-wrapper
      avatar(v-bind:profile="response._user.profile")
      .subtitle
        .author {{ response._user.profile.name }}
        .description {{ `${ response.response_meta.text || 'No description given' }` }}
      .clearfix
    ul.action-wrapper
      li.action
        a(v-bind:href="response.response" target="_blank")
          i.fas.fa-external-link-alt
      //- li.action(@click="toggleComments")
        .icon
          i.fas.fa-comments
      .clearfix
  .thumbnail-wrapper
    component(v-bind:is="responseComponent(response)" v-bind:file="response.response_meta")
  .discusstion-wrapper
    discussion(v-show="commentsVisible" v-bind:idea="idea" v-bind:hide-no-comments="true" discussion-type="response" v-bind:discussion-target="response._id" not-padded)
  
</template>

<script>
import _get from 'lodash/get'

import Avatar from '@/components/user/Avatar'
import Discussion from '@/components/design/modules/Discussion'

import ImageThumbnail from '@/components/thumbnails/ImageThumbnail'
import VideoThumbnail from '@/components/thumbnails/VideoThumbnail'
import FileThumbnail from '@/components/thumbnails/FileThumbnail'
import UnknownThumbnail from '@/components/thumbnails/UnknownThumbnail'

export default {
  name: 'media-response',
  props: ['idea', 'response'],
  components: {
    Avatar,
    Discussion,
    ImageThumbnail,
    VideoThumbnail,
    FileThumbnail,
    UnknownThumbnail
  },
  data () {
    return {
      commentsVisible: true
    }
  },
  methods: {
    responseComponent (response) {
      const contentType = _get(response, 'response_meta.mimetype', 'unknown')

      if (contentType.startsWith('image')) {
        return 'ImageThumbnail'
      }
      if (contentType.startsWith('video')) {
        return 'VideoThumbnail'
      }
      if (contentType.startsWith('file')) {
        return 'FileThumbnail'
      }
      return 'UnknownThumbnail'
    },
    toggleComments () {
      this.commentsVisible = !this.commentsVisible
    }
  }
}
</script>

<style lang="stylus" scoped>

@import '~stylus/shared'

li.media-item
  cleanlist()
  // border $color-border 1px solid
  margin 20px 10px 40px 10px
  // max-width 600px
  position relative
  .details
    padding 10px 0
    position relative
    .details-wrapper
      .avatar
        float left
        height 50px
        margin 0
        margin-right 10px
        width 50px
      .subtitle
        .description, .author
          reset()
          color $color-text-grey
          line-height 25px
          &.author
            color $color-primary
            font-size .9em
            font-weight bold
    .meta-wrapper
      padding 0 10px
  // &.comments-visible .details
  //   border-bottom $color-border 1px solid
  .thumbnail-wrapper, .discusstion-wrapper
    margin-left 60px
  .discusstion-wrapper
    margin-top 20px
  ul.action-wrapper
    cleanlist()
    position absolute
    top 0
    right 5px
    li.action
      cleanlist()
      float right
      a, .icon
        radius(50%)
        display block
        height 50px
        width 40px
        &:hover
          cursor pointer
        svg
          color $color-border
          height 20px
          margin 20px 10px
          width 20px
</style>
