<template lang="pug">
.avatar
  .avatar--image(v-if="typeof profile.avatar !== 'undefined'" v-bind:style="{ 'background-image': `url(${profile.avatar})` }")
  .avatar--icon(v-else)
</template>

<script>
export default {
  name: 'avatar',
  props: ['profile']
}
</script>

<style lang="stylus" scoped>
@import '~stylus/shared'

.avatar
  .avatar--image, .avatar--icon
    radius(50%)
    height 0
    padding-bottom 100%
    position relative
    width 100%
  .avatar--image
    background-image()
    background-color $color-lighter-grey
  .avatar--icon
    radius(50%)
    border-box()
    background-color $color-lightest-grey
    background-color white
    border $color-primary 1px solid
    color white
    overflow hidden
    position relative
    &:before, &:after
      pinned()
      radius(50%)
      background-color darken($color-lightest-grey, 10%)
      background-color $color-primary
      content ''
      top 60%
      bottom -40%
      left 10%
      right 10%
      position absolute
    &:after
      top 15%
      bottom 45%
      left 30%
      right 30%
</style>
