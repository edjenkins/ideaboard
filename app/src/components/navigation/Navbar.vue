<template lang="pug">
  #navbar(v-bind:class="authState" v-bind:style="{ 'background-color': navColor }")
    .row
      router-link#logo(to="/") Ideaboard
      #menu-toggle(@click="active = !active")
        icon(name="bars")
      #menu(v-bind:class="{ active: active }")
        router-link(to="/create") Create
        router-link(to="/explore") Explore
        router-link(to="/auth" v-if="!isAuthenticated") Login
        router-link(to="/profile" v-if="isAuthenticated" v-bind:class="{ 'has-notifications': hasNotifications }")
          | Profile
          span.notification-bubble(v-if="hasNotifications") {{ notifications.unread.length }}
      .clearfix
</template>

<script>
import { mapGetters } from 'vuex'

import Icon from 'vue-awesome/components/Icon'

export default {
  name: 'navbar',
  components: {
    Icon
  },
  data () {
    return {
      active: false,
      authState: undefined
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'navColor', 'notifications']),
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
  border-bottom alpha(black, 0.1) 1px solid
  bottom auto
  min-height $navigation-height
  position fixed
  z-index 2
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
  #menu
    float right
    line-height $navigation-height
    @media(max-width: 568px)
      border-top alpha(black, 0.1) 1px solid
      display none
      float none
      line-height $mobile-navigation-height
      padding 0 10px
      &.active
        display block
    a
      reset()
      animate()
      radius(20px)
      color white
      display block
      float left
      line-height $navigation-height - 40px
      margin 20px 5px
      padding 0 20px
      position relative
      text-decoration none
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
        margin 10px 5px 
</style>
