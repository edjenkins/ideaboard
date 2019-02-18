<template lang="pug">
 .row-wrapper#ready
  .row
    .content-block
      .ready(v-bind:class="align" )
        .ready--content
          h2 {{ title }}
          p {{ subtitle }}
          start-button(v-bind:action="action" v-bind:backgroundColor="backgroundColor" v-bind:buttonTextColor="buttonTextColor")
</template>

<script>
import { mapGetters } from 'vuex'

import StartButton from '@/components/shared/StartButton'

export default {
  name: 'ready',
  props: ['align', 'title', 'subtitle', 'action', 'link', 'image', 'backgroundColor', 'buttonTextColor'],
  components: {
    StartButton
  },
  computed: {
    ...mapGetters(['instanceBackground'])
  }
}
</script>

<style lang="stylus" scoped>

@import '~stylus/home'

.row-wrapper
  background-color white
  position relative
.ready
  padding 80px 0px !important
  position relative
  width 100%
  .ready--content
    margin 0 auto
    max-width 480px
    padding 50px 30px
    h2
      reset()
      color $color-text-grey
      font-size 2em
    p
      reset()
      color $color-text-grey
      font-size 1.2em
      margin 20px auto 30px auto

</style>
