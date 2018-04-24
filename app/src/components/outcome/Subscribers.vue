<template lang="pug">
  #subscribers
    #loading(v-if="loading") Loading...

    // No subscribers
    .no-subscribers(v-if="subscribers.length === 0") No subscribers for idea

    ul.subscriber-list(v-else)
      li.subscriber(v-for="(subscriber, index) in subscribers")
        avatar.subscriber--avatar(v-bind:profile="subscriber._user.profile")
        p.subscriber--name(@click="viewProfile(subscriber._user._id)") {{ subscriber._user.profile.name }}
        p.subscriber--date {{ getDate(subscriber.subscribedAt) }}
        .clearfix
      .clearfix
    //- ul.actions-list
      li.action
        .btn.btn-success Download as CSV
      .clearfix
</template>

<script>
import Moment from 'moment-mini'
import Avatar from '@/components/user/Avatar'

export default {
  name: 'subscribers',
  props: ['idea', 'title'],
  components: {
    Avatar
  },
  data () {
    return {
      loading: true,
      subscribers: []
    }
  },
  created () {
    this.$emit('update:title', 'Subscribers')
    this.loading = true
    this.getSubscribers()
  },
  methods: {
    getSubscribers () {
      this.subscribers = this.idea._subscribers
      this.loading = false
    },
    getDate (date) {
      return Moment(date).format('MMM Do YYYY')
    },
    viewProfile (userId) {
      this.$router.push(`/profile/${userId}`)
    }
  }
}
</script>

<style lang="stylus" scoped>

@import '~stylus/shared'

#subscribers
  #loading
    color color-text-light-grey
    line-height 200px
    text-align center
  
  .no-subscribers
    color $color-text-grey
    margin 0 0 20px 0
    padding 80px 20px
    text-align center

  ul.subscriber-list
    cleanlist()
    padding 25px 0
    li.subscriber
      cleanlist()
      border-top $color-border 1px solid
      line-height 60px
      margin 0 25px
      padding 0 10px 0 50px
      position relative
      &:first-child
        border-top none
      .subscriber--avatar
        height 40px
        left 0
        top 10px
        position absolute
        width 40px
      p.subscriber--name
        reset()
        animate()
        float left
        font-weight bold
        &:hover
          color $color-primary
          cursor pointer
      p.subscriber--date
        reset()
        color $color-text-grey
        float right
  ul.actions-list
    cleanlist()
    padding 10px
    li.action
      cleanlist()
      float left
      .btn
        margin 10px
</style>
