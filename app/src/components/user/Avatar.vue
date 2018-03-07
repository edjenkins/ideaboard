<template lang="pug">
.avatar(v-bind:style="[instanceBackground]")
  .avatar--image(v-if="typeof profile.avatar !== 'undefined'" v-bind:style="{ 'background-image': `url(${profile.avatar})` }")
  .avatar--icon(v-else)
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'avatar',
  props: ['profile'],
  computed: {
    ...mapGetters(['instanceBackground'])
  }
}
</script>

<style lang="stylus" scoped>
@import '~stylus/shared'

.avatar
  radius(50%)
  .avatar--image, .avatar--icon
    radius(50%)
    height 0
    overflow hidden
    padding-bottom 100%
    position relative
    width 100%
  .avatar--image
    background-image()
  .avatar--icon
    color white
    position relative
    &:before, &:after
      pinned()
      radius(50%)
      background-color white
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
