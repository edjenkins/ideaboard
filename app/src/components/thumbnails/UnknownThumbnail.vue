<template lang="pug">

a.unknown-thumbnail(v-bind:href="file.location" v-bind:style="{ 'background-image': `url('${file.location}')` }")
  //- pre {{ file }}
  i.far.fa-file.fa-3x
  p {{ file.originalname }}

</template>

<script>
export default {
  name: 'unknown-thumbnail',
  props: ['file']
}
</script>

<style lang="stylus" scoped>

@import '~stylus/shared'

a.unknown-thumbnail
  animate()
  background-color $color-lightest-grey
  display block
  padding 50px 0
  text-align center
  text-decoration none
  width 100%
  &:hover
    background-color darken($color-lightest-grey, 2%)
  p
    reset()
    color $color-border
    font-weight bold
  svg
    color $color-border
    margin 10px
    
</style>
