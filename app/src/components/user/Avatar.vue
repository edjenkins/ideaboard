<template lang="pug">
.avatar
  .avatar--image(v-if="typeof profile.avatar !== 'undefined'" v-bind:style="{ 'background-image': `url(${profile.avatar})` }")
  .avatar--icon(v-else)
    svg
      circle(cx="50%" cy="50%" r="50%" v-bind:fill="instanceColor")
      circle(cx="50%" cy="40%" r="25%" fill="white")
      circle(cx="50%" cy="110%" r="50%" fill="white")
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'avatar',
  props: ['profile'],
  computed: {
    ...mapGetters(['instanceColor']),
    initials () {
      var initials = this.profile.name.match(/\b\w/g) || []
      initials = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase()
      return initials
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~stylus/shared'

.avatar
  radius(50%)
  .avatar--image, .avatar--icon
    height 0
    overflow hidden
    padding-bottom 100%
    position relative
    width 100%
  .avatar--image
    radius(50%)
    background-image()
  .avatar--icon
    position relative
    svg
      pinned()
      height 100%
      width 100%
      position absolute
</style>
