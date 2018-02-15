<template lang="pug">
  .action-text-field
    .input-wrapper
      input(type="text" v-bind:value="value" v-on:input="updateValue($event.target.value)" v-bind:placeholder="placeholder")
      .btn.btn-success(@click="performAction") {{ action }}
</template>

<script>
export default {
  name: 'action-text-field',
  props: ['placeholder', 'action'],
  data () {
    return {
      value: undefined
    }
  },
  methods: {
    updateValue (value) {
      this.$emit('input', value)
    },
    performAction () {
      this.$emit('performedAction')
    }
  }
}
</script>

<style lang="stylus" scoped>

@import '~stylus/shared'

.action-text-field
  background-color $color-lightest-grey
  height 50px
  .input-wrapper
    height 50px
    position relative
    width 100%
    input 
      reset()
      height 46px
      line-height 46px
      outline 0
      padding 0 20px
      width calc(100% - 140px - 40px)
    .btn
      reset()
      background-color $color-success
      height 50px
      line-height 50px
      position absolute 
      right 0
      top 0
      width 140px
</style>
