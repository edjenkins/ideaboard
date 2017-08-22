<template lang="pug">
  #subscribers
    #loading(v-if="loading") Loading...
    ul.subscriber-list
      li.subscriber(v-for="(subscriber, index) in subscribers")
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
import Moment from 'moment'

export default {
  name: 'subscribers',
  props: ['idea'],
  data () {
    return {
      loading: true,
      subscribers: []
    }
  },
  created () {
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
  ul.subscriber-list
    cleanlist()
    padding 25px 0
    li.subscriber
      cleanlist()
      border-top $color-border 1px solid
      line-height 60px
      margin 0 25px
      padding 0 10px
      &:first-child
        border-top none
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
