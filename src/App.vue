<template lang="pug">
  #app
    navbar
    router-view
</template>

<script>
import Navbar from '@/components/navigation/Navbar'

export default {
  name: 'app',
  components: {
    Navbar
  },
  created () {
    this.$store.dispatch('checkAuthStatus')
    // Check if authenticated every 10 seconds
    setInterval(() => { this.$store.dispatch('checkAuthStatus') }, 10000)
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
