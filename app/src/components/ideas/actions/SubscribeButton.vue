<template lang="pug">
#subscribe-btn(:class="{ active: isSubscribed }")
  .btn(@click="toggleSubscription" :class="{ active: isSubscribing, subscribed: isSubscribed }")
    span(v-if="isSubscribed") {{ isSubscribing ? 'One moment..' : 'Subscribed' }}
    span(v-else) {{ isSubscribing ? 'One moment..' : 'Subscribe' }}
  .social(v-bind:class="{ active: isSubscribed }")
    social-sharing(v-bind:url="shareLink" inline-template)
      div
        network.social--link(network="twitter")
          i.fab.fa-twitter(data-fa-transform="grow-5")
        network.social--link(network="facebook")
          i.fab.fa-facebook(data-fa-transform="grow-5")
        network.social--link(network="googleplus")
          i.fab.fa-google-plus(data-fa-transform="grow-5")
        network.social--link(network="linkedin")
          i.fab.fa-linkedin(data-fa-transform="grow-5")
        .clearfix
    p.subscription-stats
      span(v-if="idea._subscribers.length === 1") You are the only subscriber
      span(v-else) You and {{ (idea._subscribers.length - 1) }} {{ (idea._subscribers.length === 2) ? 'other' : 'others' }} subscribed
    
</template>

<script>
import Vue from 'vue'

import API from '@/api'
import { mapGetters } from 'vuex'
import * as types from '@/store/mutation-types'

import _find from 'lodash/find'

var SocialSharing = require('vue-social-sharing')
Vue.use(SocialSharing)

export default {
  name: 'subscribe-button',
  props: ['idea'],
  created () {
    this.shareLink = window.location.href
  },
  data () {
    return {
      shareLink: '',
      isSubscribing: false
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'user']),
    isSubscribed () {
      if (!this.isAuthenticated) return false
      if (!this.user) return false
      return _find(this.idea._subscribers, (subscriber) => {
        this.$log(subscriber)
        if (!subscriber._user) return false
        return subscriber._user._id === this.user._id
      })
    }
  },
  methods: {
    toggleSubscription () {
      if (!this.isAuthenticated) {
        this.$store.commit(types.SHOW_AUTH_MODAL)
      } else {
        if (this.isSubscribing) return

        this.isSubscribing = true

        if (this.isSubscribed) {
          // Unsubscribe
          API.idea.unsubscribe(
            this.idea._id,
            (response) => {
              this.$log(response)
              setTimeout(() => {
                setTimeout(() => { this.isSubscribing = false }, 500)
                this.idea._subscribers = response.data.idea._subscribers // Update subscribers list
              }, 500)
            },
            (error) => {
              this.$log(error)
              setTimeout(() => { this.isSubscribing = false }, 500)
              alert('Failed to unsubscribe')
            }
          )
        } else {
          // Subscribe
          API.idea.subscribe(
            this.idea._id,
            (response) => {
              this.$log(response)
              setTimeout(() => {
                setTimeout(() => {
                  this.idea._subscribers = response.data.idea._subscribers // Update subscribers list
                  this.isSubscribing = false
                  this.$emit('subscribed')
                }, 500)
              }, 500)
            },
            (error) => {
              this.$log(error)
              setTimeout(() => { this.isSubscribing = false }, 500)
              alert('Failed to subscribe')
            }
          )
        }
      }
    }
  }
}
</script>

<style lang="stylus">

@import '~stylus/shared'

#subscribe-btn
  animate()
  position relative
  text-align center
  &.active
    padding-bottom 65px
  .btn
    radius(30px)
    background-color $color-primary
    position relative
    text-align center
    max-width 100%
    z-index 1
    &:hover
      background-color darken($color-primary, 10%)
    &.active
      background-color $color-primary
    &.subscribed
      background-color $color-success
      &.active, &:hover
        background-color darken($color-success, 10%)
  .social
    pinned()
    animate()
    position absolute
    bottom 10px
    top auto
    height 50px
    margin 0 -5px
    opacity 0
    pointer-events none
    z-index 0
    p.subscription-stats
      color darken($color-text-light-grey, 10%)
      font-size 0.8em
      @media(max-width: 680px)
        display none
    &.active
      opacity 1
      pointer-events all
    .social--link
      radius(50%)
      animate()
      display inline-block
      height 50px
      margin 10px 5px
      position relative
      text-align center
      width 50px
      svg
        animate()
        color $color-grey
        height 18px
        margin 15px 5px
      &:hover
        background-color $color-lightest-grey
        cursor pointer
        svg
          color darken($color-grey, 10%)
          opacity 1

        
</style>
