<template lang="pug">
  #app
    cookie-law
    navbar
    router-view
    auth-modal
</template>

<script>
import CookieLaw from 'vue-cookie-law'
import Navbar from '@/components/navigation/Navbar'
import AuthModal from '@/components/auth/AuthModal'

export default {
  name: 'app',
  metaInfo: {
    titleTemplate: 'Ideaboard - %s'
  },
  components: {
    CookieLaw,
    Navbar,
    AuthModal
  },
  created () {
    this.$store.dispatch('checkAuthStatus')
    // Check if authenticated every 10 seconds
    setInterval(() => { this.$store.dispatch('checkAuthStatus') }, 10000)
    // Check for notifcations every 5 seconds
    setInterval(() => { this.$store.dispatch('getNotifications') }, 5000)

    // Load drift
    let driftScript = document.createElement('script')
    driftScript.setAttribute('src', 'scripts/drift.js')
  }
}
</script>

<style lang="stylus">
@import '~stylus/shared'

html, body
  reset()

#app
  reset()
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
</style>
