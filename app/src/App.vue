<template lang="pug">
  #app
    navbar
    router-view
    auth-modal
    consent-modal
    site-footer
</template>

<script>
import Navbar from '@/components/navigation/Navbar'
import SiteFooter from '@/components/navigation/SiteFooter'
import AuthModal from '@/components/auth/AuthModal'
import ConsentModal from '@/components/auth/ConsentModal'

export default {
  name: 'app',
  metaInfo: {
    titleTemplate: 'Ideaboard - %s'
  },
  components: {
    Navbar,
    SiteFooter,
    AuthModal,
    ConsentModal
  },
  created () {
    this.$store.dispatch('checkAuthStatus')
    this.$store.dispatch('getNotifications')
    // Check if authenticated every 10 seconds
    setInterval(() => { this.$store.dispatch('checkAuthStatus') }, 10000)
    // Check for notifcations every 5 seconds
    setInterval(() => { this.$store.dispatch('getNotifications') }, 10000)

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
