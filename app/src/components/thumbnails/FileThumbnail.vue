<template lang="pug">

.file-thumbnail(v-bind:style="{ 'background-image': `url('${file.location}')` }")

</template>

<script>
export default {
  name: 'file-thumbnail',
  props: ['file']
}
</script>

<style lang="stylus" scoped>

@import '~stylus/shared'

.file-thumbnail
  background-image($color-lightest-grey)
  height 120px
  width 100%
</style>
