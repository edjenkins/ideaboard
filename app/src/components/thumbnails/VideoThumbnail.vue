<template lang="pug">

.video-thumbnail(v-bind:style="{ 'background-image': `url('${file.location}')` }")

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
  background-image($color-lightest-grey)
  height 120px
  width 100%
</style>
