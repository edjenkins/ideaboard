<template lang="pug">
  #site-footer(v-bind:class="{ light: isHome }")
    .row
      ul
        router-link.is-link(tag="li" to="/learn") About
        router-link.is-link(tag="li" to="/cookies") Cookies
        router-link.is-link(tag="li" to="/privacy") Privacy
        router-link.is-link(tag="li" to="/research") Research
        router-link.is-link(tag="li" to="/terms") Terms
        li © 2018 Open Lab
      .clearfix
      #google_translate_element
</template>

<script>
export default {
  name: 'site-footer',
  computed: {
    isHome () {
      return this.$route.name === 'home'
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~stylus/shared'

#site-footer
  min-height $footer-height
  padding 20px 0
  &.light
    background-color white
    border-top $color-lightest-grey 1px solid
  ul
    cleanlist()
    line-height $footer-height
    text-align center
    li
      cleanlist()
      reset()
      animate()
      color alpha(black, 0.2)
      display inline-block
      line-height $footer-height
      padding 0 15px
      text-decoration none
      white-space nowrap
      &.is-link:hover
        cursor pointer
        color alpha(black, 0.4)
        text-decoration underline

  #google_translate_element
    line-height 20px !important
    padding 0 10px 10px 10px
    text-align center
    .skiptranslate.goog-te-gadget
      display inline-block !important
      white-space normal !important

</style>
