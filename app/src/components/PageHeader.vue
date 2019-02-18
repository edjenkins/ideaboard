<template lang="pug">
  #page-header(v-bind:style="[instanceBackground]")
    .row
      h1(v-if="title" v-bind:style="{color: instanceLogoColor}") {{ title }}
      h4(v-if="subtitle" v-bind:style="{color: instanceLogoColor}") {{ subtitle }}
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
    ...mapGetters(['instanceBackground', 'instanceLogoColor'])
  }
}
</script>

<style lang="stylus" scoped>
@import '~stylus/shared'

#page-header
  animate()
  gradient()
  background-image()
  background-color $color-primary
  box-sizing border-box
  padding 140px 20px 60px 20px
  position relative
  text-align left
  @media(max-width: 680px)
    padding 100px 20px 60px 20px
  h1
    reset()
    font-weight bold 
    padding 0
  h4
    reset()
    font-weight normal 
    padding 0
</style>
