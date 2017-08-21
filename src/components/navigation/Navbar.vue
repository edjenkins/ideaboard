<template lang="pug">
  #navbar(:class="authState")
    .row
      router-link#logo(to="/") ideaboard.io
      #menu
        router-link(to="/create") create
        router-link(to="/explore") explore
        router-link.primary(to="/profile" v-if="isAuthenticated") my profile
        router-link.primary(to="/join" v-if="!isAuthenticated") get started
      .clearfix
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'navbar',
  data () {
    return {
      authState: undefined
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated'])
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
  &.authenticating
    background-color $color-success
  &.authenticated
    background-color $color-primary
  &.unauthenticating
    background-color $color-danger
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
  #menu
    float right
    line-height $navigation-height
    a
      reset()
      animate()
      radius(18px)
      color white
      line-height $navigation-height - 12px
      padding 6px 20px
      text-decoration none
      &:hover
        background-color alpha(black, 0.1)
        cursor pointer
      &.primary
        border white 1px solid
        margin 0 15px
      @media(max-width: 460px)
        margin 0
        padding 6px 10px
        &.primary
          border none
          margin 0
          padding 6px 10px
</style>
