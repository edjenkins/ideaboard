<template lang="pug">
  #navbar(v-bind:class="[{ scrolled: hasScrolled }, authState]" v-bind:style="[instanceBackground]")
    .row
      router-link#logo(v-bind:to="{ name: 'home' }") Ideaboard
      hamburger(v-bind:active.sync="active")
      #menu-underlay(v-bind:class="{ active: active }" @click="active = false")
      #menu(v-bind:class="{ active: active }" v-bind:style="[instanceBackground]")
        router-link(v-bind:to="{ name: 'start' }") Create
        router-link(v-bind:to="{ name: 'explore' }") Explore
        router-link(v-bind:to="{ name: 'auth' }" v-if="!isAuthenticated") Get Started
        router-link(v-bind:to="{ name: 'profile' }" v-else v-bind:class="{ 'has-notifications': hasNotifications }")
          | Profile
          span.notification-bubble(v-if="hasNotifications") {{ notifications.unread.length }}
        .clearfix
      .clearfix
</template>

<script>
import { mapGetters } from 'vuex'

import Hamburger from '@/components/navigation/Hamburger'

export default {
  name: 'navbar',
  components: {
    Hamburger
  },
  mounted () {
    window.addEventListener('scroll', this.updateScroll)
  },
  data () {
    return {
      hasScrolled: false,
      active: false,
      authState: undefined
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'instanceBackground', 'notifications']),
    hasNotifications () {
      return this.notifications && this.notifications.unread && (this.notifications.unread.length > 0)
    }
  },
  watch: {
    isAuthenticated (nV) {
      this.authState = nV ? 'authenticating' : 'unauthenticating'
      if (!nV) {
        this.$router.push('/auth')
      }
      setTimeout(() => {
        this.authState = nV ? 'authenticated' : 'unauthenticated'
      }, 1000)
    }
  },
  methods: {
    updateScroll () {
      this.hasScrolled = (window.scrollY > 10)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~stylus/shared'

#navbar
  animate()
  gradient()
  pinned()
  background-color $color-primary
  bottom auto
  min-height $navigation-height
  position fixed
  z-index 2
  &.scrolled
    nav-shadow()
  @media(max-width: 568px)
    min-height $mobile-navigation-height
  &.authenticating
    background-color $color-success !important
  &.authenticated
    background-color $color-primary
  &.unauthenticating
    background-color $color-danger !important
  &.unauthenticated
    background-color $color-primary
  #logo
    reset()
    color white
    float left
    font-size 1.2em
    font-weight bold
    line-height $navigation-height
    padding 0 10px
    text-decoration none
    @media(max-width: ($page-width + 10px))
      padding 0 20px
    @media(max-width: 568px)
      float none
      line-height $mobile-navigation-height
  #menu-toggle
    color white
    display none
    position absolute
    top 0
    right 0
    padding 0 20px
    @media(max-width: 568px)
      display block
      line-height $mobile-navigation-height
  #menu-underlay
    animate()
    pinned()
    background-color alpha(black, 0.5)
    position fixed
    top $mobile-navigation-height
    opacity 0
    pointer-events none
    &.active
      opacity 1
      pointer-events all
  #menu
    animate()
    float right
    line-height $navigation-height
    @media(min-width: 568px)
      background-color transparent !important
    @media(max-width: 568px)
      gradient()
      transform rotateX(90deg)
      transform-origin 0 0
      border-top alpha(black, 0.1) 1px solid
      border-bottom alpha(black, 0.1) 1px solid
      opacity 0
      float none
      line-height $mobile-navigation-height
      padding 10px
      position absolute
      pointer-events none
      width 100%
      &.active
        opacity 1
        pointer-events all
        transform rotateX(0deg)
    a
      reset()
      animate()
      radius(20px)
      color white
      display block
      float left
      line-height $mobile-navigation-height - 20px
      margin 20px 5px
      padding 0 20px
      position relative
      overflow hidden
      text-decoration none
      white-space nowrap
      &.has-notifications
        padding-right 40px
        span.notification-bubble
          radius(50%)
          background-color red
          display block
          font-size 0.8em
          font-weight bold
          height 26px
          line-height 26px
          position absolute 
          right 7px
          top 7px
          text-align center
          width 26px
      &:hover
        background-color alpha(black, 0.05)
        cursor pointer
      &.router-link-active
        background-color alpha(black, 0.1)
      @media(max-width: 568px)
        border-box()
        margin 10px
        text-align center
        margin 10px
        padding 0 20px
        width calc(calc(100% - 80px) / 3)
      @media(max-width: 440px)
        width calc(50% - 30px)
        &:nth-child(3)
          width calc(100% - 40px)
</style>
