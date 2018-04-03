<template lang="pug">

  .navigation-button(@click="toggle")
    .bar-wrapper(v-bind:class="{ 'cross': active }")
      .bar.top-bar
      .bar.middle-bar
      .bar.bottom-bar

</template>

<script>
export default {
  name: 'hamburger',
  props: ['active'],
  watch: {
    '$route.path': {
      handler: function (nV, oV) {
        this.$emit('update:active', false)
      },
      deep: true
    }
  },
  methods: {
    toggle () {
      if (this.active) {
        this.$emit('update:active', false)
      } else {
        this.$emit('update:active', true)
      }
    }
  }
}

</script>

<style lang="stylus" scoped>

@import '~stylus/shared'

.navigation-button
  animate()
  display none
  height 50px
  margin 5px
  width 52px

  position fixed
  top 0
  right 0
  z-index 55
  
  @media(max-width: 568px)
    display block

  .bar-wrapper
    pinned()
    position absolute
    .bar
      animate()
      pinned()
      background-color white
      height 2px
      left 12px 
      right 12px
      position absolute
      &.top-bar
        top 16px
        bottom auto
      &.bottom-bar
        bottom 16px
        top auto
      &.middle-bar
        left 14px 
        right 14px
        bottom 24px
        top auto

  &:hover
    cursor pointer

  /* Active styles */
  &.active
    background-color transparent
    left calc(100% - 60px)
    z-index 56
    @media(min-width: 360px)
      left 310px
  
  .bar-wrapper
    &.cross
      .bar
        left 12px !important
        right 12px !important
      .top-bar
        top 24px !important
        transform rotate(-45deg)
      .bottom-bar
        bottom 24px !important
        transform rotate(45deg)
      .middle-bar
        opacity 0
        left 24px !important
        right 24px !important

</style>
