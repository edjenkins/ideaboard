<template lang="pug">
 .row-wrapper#collaborate(v-bind:style="[styles || instanceBackground]")
  .row
    .content-block
      .collaborate
        .collaborate--image
          img(src="~images/illustrations/design.svg")
        .collaborate--content
          h2 {{ title }}
          p {{ subtitle }}
          router-link.collaborate--action(v-bind:to="link") {{ action }}
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'collaborate',
  props: ['title', 'subtitle', 'action', 'link', 'styles'],
  computed: {
    ...mapGetters(['instanceBackground'])
  }
}
</script>

<style lang="stylus" scoped>

@import '~stylus/home'

.row-wrapper
  gradient()
  background-color $color-primary
  position relative
.collaborate
  padding 80px 0px !important
  position relative
  width 100%
  .collaborate--image
    margin-right 50%
    position absolute
    text-align center
    width 50%
    img
      height 320px
      max-width 100%
  .collaborate--content
    margin-left 50%
    padding 50px 30px
    text-align center
    h2
      reset()
      color white
      font-size 2em
    p
      reset()
      color white
      font-size 1.2em
      margin 20px auto 30px auto
    .collaborate--action
      animate()
      radius(30px)
      background-color alpha(black, 0.05)
      color white
      display inline-block
      font-weight bold
      line-height 60px
      margin 0 20px
      padding 0 30px
      text-align center
      text-decoration none
      &:hover
        cursor pointer
        background-color alpha(black, 0.1)

  @media(max-width: 640px)
    padding 0 !important
    .collaborate--image
      margin 40px auto 20px auto
      position relative
      text-align center
      max-width calc(100% - 120px)
      width 100%
      img
        height auto
    .collaborate--content
      margin-right auto !important
      margin-left auto !important
</style>
