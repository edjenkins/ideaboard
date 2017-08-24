<template lang="pug">
 .row-wrapper#splash-image
  .row
    .content-block
      .splash-image(v-bind:class="align" v-bind:style="{ 'background-image': `url(${image})` }")
        .splash-image--content(v-bind:style="{ 'background-color': navColor }")
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
    ...mapGetters(['navColor'])
  }
}
</script>

<style lang="stylus" scoped>

@import '~stylus/home'

.splash-image
  background-image()
  position relative
  width 100%
  &.left .splash-image--content
    margin-right 50%
  &.right .splash-image--content
    margin-left 50%
  .splash-image--content
    background-color $color-primary
    padding 50px 30px
    h2
      reset()
      color white
      font-size 2em
    p
      reset()
      color white
      margin 20px auto 30px auto
    .splash-image--action
      animate()
      radius(30px)
      background-color transparent
      border white 1px solid
      color white
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
    .splash-image--content
      margin-right auto
</style>
