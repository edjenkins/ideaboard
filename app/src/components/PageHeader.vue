<template lang="pug">
  #page-header(v-bind:style="{ 'background-color': navColor }")
    .row
      h1(v-if="title") {{ title }}
      h4(v-if="subtitle") {{ subtitle }}
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'page-header',
  props: ['title', 'subtitle'],
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters(['navColor'])
  }
}
</script>

<style lang="stylus" scoped>
@import '~stylus/shared'

#page-header
  animate()
  background-color $color-primary
  box-sizing border-box
  padding 80px 20px 60px 20px
  text-align left
  @media(max-width: 680px)
    padding 40px 20px 60px 20px
  
  h1
    reset()
    color white
    font-weight bold 
    padding 0
  h4
    reset()
    color white
    font-weight normal 
    padding 0
</style>
