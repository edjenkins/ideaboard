<template lang="pug">
.design-task--dicussion
  p.design-task--description(v-if="activeTask.description") {{ activeTask.description }}

  .dicussion-wrapper
    // No comments
    .no-comments(v-if="comments.length === 0") No comments posted

    // Comments
    ul.comment-thread(v-for="(comment, index) in comments" v-bind:key="index" v-bind:class="{ 'has-replies': ((comment._replies.length > 0) || (replyTarget === comment._id)), 'is-replying': (replyTarget === comment._id) }")
      li.comment
        .comment--avatar(v-bind:style="{ 'background-image': `url('${comment._user.profile.avatar}')` }")
        .comment--user {{ comment._user.profile.name }}
        .comment--text {{ comment.text }}

      // Replies
      ul.replies
        li.comment.reply(v-for="(reply, index) in comment._replies" v-bind:key="index")
          .comment--avatar(v-bind:style="{ 'background-image': `url('${reply._user.profile.avatar}')` }")
          .comment--user {{ reply._user.profile.name }} 
            span replied to {{ comment._user.profile.name }}
          .comment--text {{ reply.text }}

      // Comment actions
      ul.comment--actions(v-if="isAuthenticated")
        li.comment--action(hidden)
          | like
        li.comment--action(@click="replyTarget = (replyTarget) ? undefined : comment._id" v-bind:class="{ active: (replyTarget === comment._id) }")
          | reply
        li.comment--action(hidden)
          | report
        .clearfix

      // Reply composer
      .comment-composer.reply-composer(v-if="replyTarget === comment._id")
        .input-wrapper(@click="checkAuth")
          input(v-bind:disabled="!isAuthenticated" type="text" v-model="newReply.text" placeholder="Write a reply.." v-on:keyup.enter="postComment")
          .btn.btn-primary(@click="postComment") Reply

    // Compose comment
    .comment-composer(v-bind:class="{ subtle: replyTarget }")
      .input-wrapper(@click="checkAuth")
        input(v-bind:disabled="!isAuthenticated" type="text" v-model="newComment.text" placeholder="Write a comment.." @focus="replyTarget = undefined" v-on:keyup.enter="postComment")
        .btn(v-bind:class="{ 'btn-primary': !replyTarget }" @click="postComment") Post
</template>

<script>
import { mapGetters } from 'vuex'
import * as types from '@/store/mutation-types'
import _ from 'lodash'
import Icon from 'vue-awesome/components/Icon'
import 'vue-awesome/icons/arrow-left'

import Commentable from '@/mixins/Commentable'

export default {
  name: 'dicussion',
  props: ['active-task', 'idea'],
  mixins: [
    Commentable
  ],
  components: {
    Icon
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'user']),
    commentTarget () {
      return (this.activeTask && this.activeTask._id) ? this.activeTask._id : this.idea._id
    },
    commentType () {
      return (this.activeTask && this.activeTask._id) ? 'task' : 'idea'
    }
  },
  methods: {
    wrap (name) {
      return _.replace(name, ' ', '')
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

.design-task--dicussion
  background-color white
  padding 25px

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
      position absolute
      right 0
      bottom 0
      line-height 40px
      padding 0
      width 80px
    .input-wrapper
      border $color-border 1px solid
      input
        border none
        box-sizing border-box
        line-height 30px
        outline 0
        padding 5px 10px
        padding-right 80px
        width calc(100% - 80px)

  ul.comment-thread
    cleanlist()
    margin 30px 0
    position relative
    &:first-child
      margin-top 0
    &.has-replies
      &:before
        border-right $color-primary 4px solid
        content ''
        position absolute
        top 25px
        bottom 45px
        right auto
        left 18px
        width 0
    li.comment
      cleanlist()
      min-height 40px
      margin 10px 0
      padding-left 50px
      position relative

      .comment--avatar
        radius(50%)
        background-image()
        background-color $color-lighter-grey
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
      margin -10px -10px 0 40px
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
