<template lang="pug">
.rendered-content
  .content-wrapper(v-html="content")  
</template>

<script>
export default {
  name: 'rendered-content',
  props: ['content']
}
</script>

<style lang="stylus">

@import '~stylus/shared'

.rendered-content
  .content-wrapper
    span
      reset()
    p
      reset()
      padding 5px 0
    .ql-size-large
      color black
      font-size 2em
      font-weight bold
</style>
