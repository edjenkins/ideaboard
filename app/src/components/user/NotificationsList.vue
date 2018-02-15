<template lang="pug">
  .notifications-list-wrapper(v-if="notifications && notifications.length !== 0" v-bind:class="type")
    .notifications-list
      .notification(v-for="(notification, index) in notifications")
        h5 {{ notification.text }}
        //- Invitation
        .response-options(v-if="canRespond(notification)")
          .btn(v-for="(action, index) in notification._invitation.meta.actions" v-bind:class="{ 'btn-success': action.type === 'success', 'btn-danger': action.type === 'danger' }" @click="performAction(notification._invitation._id, action.action)") {{ action.label }}
        .clearfix
      .clearfix
</template>

<script>
import API from '@/api'
import _has from 'lodash/has'

export default {
  name: 'notifications-list',
  props: ['type', 'notifications'],
  methods: {
    performAction (_id, action) {
      API.invitation.respond(
        _id, action,
        (response) => {
          this.$log(response)
          this.$store.dispatch('getNotifications')
        },
        (error) => {
          this.$log(error)
        })
    },
    canRespond (notification) {
      return notification._invitation && notification._invitation.status !== 'disabled' && _has(notification, '_invitation.meta.actions')
    }
  }
}
</script>

<style lang="stylus" scoped>

@import '~stylus/shared'

.notifications-list-wrapper
  text-align left
  .notifications-list
    background-color $color-lightest-grey
    padding 10px
    .notification
      padding 0
      h5
        reset()
        display inline-block
        line-height 20px
        padding 20px
      .response-options
        display inline-block
        float right
        .btn
          display inline-block
          height 40px
          line-height 40px
          margin 10px
  &.unread
    .notifications-list
      background-color white
  &.read
    .notifications-list
      background-color $color-lightest-grey
      .notification h5
        color $color-text-light-grey

</style>
