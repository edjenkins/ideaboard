<template lang="pug">
  #site-footer
    .row
      ul
        li Copyright 2017
        li Terms
        li Privacy
      .clearfix
</template>

<script>
export default {
  name: 'site-footer',
  data () {
    return {
    }
  }
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
      color alpha(black, 0.2)
      display inline
      line-height $footer-height
      padding 0 20px
      text-decoration none
</style>
