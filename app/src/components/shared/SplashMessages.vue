<template lang="pug">
.splash-messages
  ul
    li.animated.fadeIn(v-for="(message, index) in messages" v-bind:key="index" v-bind:class="message.type") {{ message.text }}
    .clearfix
</template>

<script>
export default {
  name: 'splash-messsages',
  props: ['messages']
}
</script>

<style lang="stylus" scoped>

@import '~stylus/shared'

.splash-messages
  padding 10px
  ul
    cleanlist()
    li
      cleanlist()
      border-left grey 3px solid
      margin 5px 0
      padding 5px 10px
      &.success
        background-color alpha($color-success, 0.1)
        border-left-color $color-success
      &.error
        background-color alpha($color-warning, 0.1)
        border-left-color $color-warning
</style>
