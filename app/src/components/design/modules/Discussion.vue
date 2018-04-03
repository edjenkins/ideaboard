<template lang="pug">
.dicussion-container(v-bind:class="{ 'no-padding': notPadded }")

  p.design-task--description(v-if="task && task.description && task.type !== 'media'") {{ task.description }}

  //- splash-messages(v-if="!isAuthenticated" v-bind:messages="[{type:'success',text:'Please login to participate!'}]")

  .dicussion-wrapper
    // No comments
    .no-comments(v-if="comments.length === 0 && !hideNoComments") Be the first to comment

    // Comments
    ul.comment-thread(v-for="(comment, index) in comments" v-bind:key="index" v-bind:class="{ 'has-replies': ((comment._replies.length > 0) || (replyTarget === comment._id)), 'is-replying': (replyTarget === comment._id) }")
      li.comment
        router-link.avatar-wrapper(tag="div" v-bind:to="{ name: 'profile', params: { id: comment._user._id }}" v-bind:title="comment._user.profile.name")
          avatar.comment--avatar(v-bind:profile="comment._user.profile")
        .comment--user {{ comment._user.profile.name }}
        .comment--text {{ comment.text }}

        // Comment actions
        ul.comment--actions(v-if="isAuthenticated")
          li.comment--action(hidden)
            | like
          li.comment--action(@click="reportOrDestroy('comment', comment._id, comment._user)")
            | {{ (isModerator || user._id === comment._user._id) ? 'delete' : 'report' }}
          li.comment--action(v-if="comment._replies.length === 0" @click="replyTarget = (replyTarget) ? undefined : comment._id" v-bind:class="{ active: (replyTarget === comment._id) }")
            | {{ (replyTarget && (replyTarget === comment._id)) ? 'cancel' : 'reply' }}
          .clearfix

      // Replies
      ul.replies
        li.comment.reply(v-for="(reply, replyIndex) in comment._replies" v-bind:key="replyIndex")
          router-link.avatar-wrapper(tag="div" v-bind:to="{ name: 'profile', params: { id: reply._user._id }}" v-bind:title="reply._user.profile.name")
            avatar.comment--avatar(v-bind:profile="reply._user.profile")
          .comment--user {{ reply._user.profile.name }} 
            span replied to {{ comment._user.profile.name }}
          .comment--text {{ reply.text }}

          // Comment actions
          ul.comment--actions(v-if="isAuthenticated")
            li.comment--action(hidden)
              | like
            li.comment--action(@click="reportOrDestroy('comment', reply._id, reply._user)")
              | {{ (isModerator || user._id === reply._user._id) ? 'delete' : 'report' }}
            li.comment--action(v-if="(comment._replies.length - 1) === replyIndex" @click="replyTarget = (replyTarget) ? undefined : comment._id" v-bind:class="{ active: (replyTarget === comment._id) }")
              | {{ (replyTarget && (replyTarget === comment._id)) ? 'cancel' : 'reply' }}
            .clearfix

      // Reply composer
      .comment-composer.reply-composer(v-if="replyTarget === comment._id")
        .input-wrapper(@click="checkAuth")
          textarea-autosize(v-bind:disabled="!isAuthenticated" name="composer-textarea" ref="textarea" rows="1" @keydown.native.enter.prevent.stop="postComment" placeholder="Reply here..." v-model="newReply.text" v-bind:min-height="10" v-bind:max-height="200")
          .btn.btn-primary(v-bind:class="{ active: (newReply.text && newReply.text.length > 1) }" @click="postComment")
            i.fas.fa-arrow-right

    // Compose comment
    .comment-composer(v-bind:class="{ subtle: replyTarget }")
      .input-wrapper(@click="checkAuth")
        textarea-autosize(v-bind:disabled="!isAuthenticated" name="composer-textarea" ref="textarea" rows="1" @keydown.native.enter.prevent.stop="postComment" placeholder="Comment here..." v-model="newComment.text" v-bind:min-height="10" v-bind:max-height="200" @focus.native="replyTarget = undefined")
        .btn(v-bind:class="{ active: (newComment.text && newComment.text.length > 1), 'btn-primary': !replyTarget }" @click="postComment")
          i.fas.fa-arrow-right
</template>

<script>
import Vue from 'vue'
import { mapGetters } from 'vuex'
import * as types from '@/store/mutation-types'
import _replace from 'lodash/replace'

import VueTextareaAutosize from 'vue-textarea-autosize'

import DesignTask from '@/mixins/DesignTask'
import Commentable from '@/mixins/Commentable'
import Reportable from '@/mixins/Reportable'
import Avatar from '@/components/user/Avatar'

Vue.use(VueTextareaAutosize)

export default {
  name: 'dicussion',
  props: ['notPadded', 'hideNoComments', 'discussionTarget', 'discussionType'],
  mixins: [
    DesignTask,
    Commentable,
    Reportable
  ],
  components: {
    VueTextareaAutosize,
    Avatar
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'user']),
    commentTarget () {
      if (typeof this.discussionTarget === 'undefined') {
        return this.$route.params.task_id ? this.$route.params.task_id : this.$route.params.id
      }
      return this.discussionTarget
    },
    commentType () {
      if (typeof this.discussionType === 'undefined') {
        return (this.$route.params.task_id) ? 'task' : 'idea'
      }
      return this.discussionType
    }
  },
  methods: {
    wrap (name) {
      return _replace(name, ' ', '')
    },
    checkAuth () {
      if (!this.isAuthenticated) {
        this.$store.commit(types.SHOW_AUTH_MODAL)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>

@import '~stylus/shared'

.dicussion-container
  background-color white
  padding 25px
  &.no-padding
    padding 0

// Discussion
.dicussion-wrapper
  .no-comments
    color $color-text-grey
    margin 0 0 20px 0
    padding 28px 20px
    text-align center
  
  .comment-composer
    animate()
    margin-top 0
    opacity 1
    position relative
    &.subtle
      opacity 0.5
    &.reply-composer
      margin-top 10px
    .btn
      radius(50%)
      pinned()
      position absolute
      left auto
      top auto
      line-height 40px
      opacity 0
      padding 0
      pointer-events none
      width 40px
      &.active
        opacity 1
        pointer-events all
    .input-wrapper
      border $color-border 1px solid
      margin-right 50px
      input, textarea
        border-box()
        border none
        display block
        line-height 20px
        outline 0
        margin 0
        padding 10px
        width 100%

  ul.comment-thread
    cleanlist()
    margin 30px 0
    position relative
    &:first-child
      margin-top 0
    &.has-replies
      &:before
        border-right $color-primary 2px solid
        content ''
        position absolute
        top 25px
        bottom 45px
        right auto
        left 19px
        width 0
    li.comment
      cleanlist()
      min-height 40px
      margin 10px 0
      padding-left 50px
      position relative

      .avatar-wrapper:hover
        cursor pointer
      .comment--avatar
        radius(50%)
        background-image($color-lighter-grey)
        border none
        left 0
        height 40px
        position absolute
        width 40px
      .comment--user
        color $color-text-dark-grey
        color $color-primary
        font-size 0.8em
        font-weight bold
        span
          color $color-text-light-grey
      .comment--text
        color $color-text-grey
        font-size 1em
        font-weight normal

    // Replies
    ul.replies
      position relative
      left -40px
      li.comment.reply
        margin-top 20px
        &:last-child
          &:before
            pinned()
            top 40px
            content ''
            background-color white
            position absolute
            width 40px
    // Show reply line when replying
    &.is-replying
      ul.replies
        li.comment.reply
          &:last-child
            &:before
              background-color transparent
    // Actions
    ul.comment--actions
      cleanlist()
      margin 0 -10px 0 -10px
      li.comment--action
        animate()
        cleanlist()
        color $color-text-light-grey
        float left
        font-size 0.9em
        margin 0 10px
        &:hover, &.active
          color $color-primary
          cursor pointer
</style>
