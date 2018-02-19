<template lang="pug">
  #site-footer
    .row
      ul
        li Copyright 2018
        router-link.is-link(tag="li" to="/learn") About
        router-link.is-link(tag="li" to="/terms") Terms
        router-link.is-link(tag="li" to="/privacy") Privacy
      .clearfix
</template>

<script>
export default {
  name: 'site-footer'
}
</script>

<style lang="stylus" scoped>
@import '~stylus/shared'

#site-footer
  height $footer-height
  margin 20px 0
  ul
    cleanlist()
    line-height $footer-height
    text-align center
    li
      cleanlist()
      reset()
      animate()
      color alpha(black, 0.2)
      display inline
      line-height $footer-height
      padding 0 15px
      text-decoration none
      &.is-link:hover
        cursor pointer
        color alpha(black, 0.4)
        text-decoration underline
</style>
