<template lang="pug">
  router-link.start-button(v-bind:to="{ name: 'start' }" v-bind:style="backgroundColor ? {'background-color': backgroundColor, color: buttonTextColor || 'white'} : {}") {{action}}
</template>

<script>
export default {
  name: 'start-button',
  props: ['action', 'backgroundColor', 'buttonTextColor']
}
</script>

<style lang="stylus" scoped>

@import '~stylus/shared'

.start-button
  animate()
  radius(30px)
  background-color $color-success
  color white
  display inline-block
  font-weight bold
  line-height 60px
  margin 0
  padding 0 30px
  text-align center
  text-decoration none
  &:hover
    cursor pointer
    background-color darken($color-success, 10%) !important

</style>
