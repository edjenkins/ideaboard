<template lang="pug">
  #navbar(v-bind:class="authState" v-bind:style="{ 'background-color': navColor }")
    .row
      router-link#logo(to="/") ideaboard
      #menu-toggle(@click="active = !active")
        icon(name="bars")
      #menu(v-bind:class="{ active: active }")
        router-link(to="/create") Create
        router-link(to="/explore") Explore
        router-link(to="/profile" v-if="isAuthenticated") Profile
        router-link(to="/join" v-if="!isAuthenticated") Login
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
    ...mapGetters(['isAuthenticated', 'navColor'])
  },
  watch: {
    isAuthenticated (nV) {
      this.authState = nV ? 'authenticating' : 'unauthenticating'
      if (!nV) {
        this.$router.push('/join')
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
  background-color $color-primary
  border-bottom alpha(black, 0.1) 1px solid
  min-height $navigation-height
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
    font-weight normal
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
      text-decoration none
      &:hover
        background-color alpha(black, 0.05)
        cursor pointer
      &.router-link-active
        background-color alpha(black, 0.1)
      @media(max-width: 568px)
        margin 10px 5px 
</style>
