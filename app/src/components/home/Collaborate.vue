<template lang="pug">
 .row-wrapper#collaborate
  .row
    .content-block
      .collaborate(v-bind:class="align" )
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
  props: ['align', 'title', 'subtitle', 'action', 'link'],
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
  &.left
    .collaborate--content
      margin-right 50%
    .collaborate--image
      margin-left 50%
  &.right
    .collaborate--content
      margin-left 50%
    .collaborate--image
      margin-right 50%
  &.center
    .collaborate--content
      margin 0 auto
      max-width 480px
    .collaborate--image
      margin-right 0%
  .collaborate--image
    position absolute
    text-align center
    width 50%
    img
      height 320px
  .collaborate--content
    padding 50px 30px
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
      display none
    .collaborate--content
      margin-right auto !important
      margin-left auto !important
</style>
