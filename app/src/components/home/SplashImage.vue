<template lang="pug">
 .row-wrapper#splash-image
  //-  (v-bind:style="{ 'background-image': `url('${image}')` }")
  .row
    .content-block
      .splash-image(v-bind:class="align" )
        .splash-image--image
          img(v-bind:src="image")
        .splash-image--content
          h2 {{ title }}
          p {{ subtitle }}
          router-link.splash-image--action(v-bind:to="link") {{ action }}
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'splash-image',
  props: ['align', 'title', 'subtitle', 'action', 'link', 'image'],
  computed: {
    ...mapGetters(['instanceBackground'])
  }
}
</script>

<style lang="stylus" scoped>

@import '~stylus/home'
.row-wrapper
  background-image()
  background-color white
  position relative
.splash-image
  padding 80px 0px !important
  position relative
  width 100%
  &.left
    .splash-image--content
      margin-right 50%
    .splash-image--image
      margin-left 50%
  &.right
    .splash-image--content
      margin-left 50%
    .splash-image--image
      margin-right 50%
  .splash-image--image
    position absolute
    text-align center
    width 50%
    img
      height 320px
  .splash-image--content
    background-color white
    padding 50px 30px
    h2
      reset()
      color $color-text-grey
      font-size 2em
    p
      reset()
      color $color-text-grey
      margin 20px auto 30px auto
    .splash-image--action
      animate()
      radius(30px)
      background-color transparent
      border $color-text-grey 1px solid
      color $color-text-grey
      display inline-block
      font-weight bold
      line-height 60px
      margin 0 20px
      padding 0 40px
      text-align center
      text-decoration none
      &:hover
        cursor pointer
        background-color alpha(black, 0.05)

  @media(max-width: 640px)
    padding 0 !important
    .splash-image--image
      display none
    .splash-image--content
      margin-right auto !important
      margin-left auto !important
</style>
