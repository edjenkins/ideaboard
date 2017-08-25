<template lang="pug">
  #auth-modal(v-if="authModalVisible")
    .auth-panel
      #close-button(@click="closeAuthModal")
        icon(name="times")
      h1 Woah
      h3 Looks like you aren't signed in!
      p Please create an account or login to get started

      a.oauth-button#facebook(v-bind:href="oAuthLink('facebook')" target="_self") Continue with Facebook
      .oauth-button.minimal.split(@click="redirectToJoin") Sign Up
      .oauth-button.minimal.split(@click="redirectToJoin") Login
      .clearfix

</template>

<script>
import { mapGetters } from 'vuex'
import * as types from '@/store/mutation-types'
import Icon from 'vue-awesome/components/Icon'
import 'vue-awesome/icons/times'

export default {
  name: 'auth-modal',
  components: {
    Icon
  },
  data () {
    return {
      state: undefined
    }
  },
  computed: {
    ...mapGetters([
      'isAuthenticated', 'authModalVisible'
    ])
  },
  watch: {
    isAuthenticated (nV) {
      if (nV) {
        this.$store.commit(types.HIDE_AUTH_MODAL)
      }
    },
    authModalVisible (nV) {
      if (nV) {
        // Store current url in cookie for redirect after auth
        this.$session.start()
        this.$session.set('auth-redirect', window.location.href)
        console.log('Setting auth-redirect..')
        console.log(this.$session.get('auth-redirect'))
      }
    }
  },
  methods: {
    redirectToJoin () {
      this.$store.commit(types.HIDE_AUTH_MODAL)
      this.$router.push('/join')
    },
    closeAuthModal () {
      this.$store.commit(types.HIDE_AUTH_MODAL)
    },
    oAuthLink (network) {
      switch (network) {
        case 'facebook':
          const instance = 'wea'
          return `https://api.eventspark.co.uk/auth/facebook/login/${instance}`
      }
    }
  }
}
</script>

<style lang="stylus" scoped>

@import '~stylus/auth'

#auth-modal
  pinned()
  position fixed
  z-index 50

  &:before
    pinned()
    background-color alpha(black, 0.7)
    content ''
    position fixed

  #close-button
    position absolute
    top 0
    right 0
    padding 20px

  .auth-panel
    center-align()
    background-color white
    max-width calc(100% - 20px)
    width 320px
    box-sizing border-box
    margin 0 auto
    padding 20px
    text-align center

  .auth-form
    text-align left
    h2
      reset()
      color $text-grey
      padding 10px
    p#forgot-link
      color $color-text-grey
      font-size 0.9em
      padding 10px 0
      text-decoration underline
</style>
