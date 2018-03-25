<template lang="pug">

.video-thumbnail
  video(v-bind:src="file.location" controls)

</template>

<script>
export default {
  name: 'video-thumbnail',
  props: ['file']
}
</script>

<style lang="stylus" scoped>

@import '~stylus/shared'

.video-thumbnail
  reset()
  width 100%
  video
    reset()
    background-color $color-lightest-grey
    width 100%
</style>
