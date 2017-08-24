<template lang="pug">
  #app
    navbar
    router-view
</template>

<script>
import Navbar from '@/components/navigation/Navbar'

export default {
  name: 'app',
  metaInfo: {
    title: 'Welcome',
    description: 'Learn how IdeaBoard can help turn your idea into a reality through the power of online communities',
    titleTemplate: 'IdeaBoard - %s',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'og:title', content: 'IdeaBoard' },
      { name: 'og:image', content: '~images/banners/design.jpg' }
    ]
  },
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
