<template lang="pug">
.avatar
  .avatar--image(v-bind:style="{ 'background-image': `url(${(profile.avatar) ? profile.avatar : 'https://eventmovement.co.uk/dynamic/avatar/medium' })` }")
</template>

<script>
export default {
  name: 'avatar',
  props: ['profile'],
  data () {
    return {
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~stylus/shared'

.avatar
  .avatar--image
    radius(50%)
    background-image()
    background-color $color-lighter-grey
    height 0
    padding-bottom 100%
    position relative
    width 100%
</style>
