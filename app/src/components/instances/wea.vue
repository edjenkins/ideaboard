<template lang="pug">
  #home
    .row-wrapper#welcome(v-bind:style="{ 'background-color': navColor }")
      .row
        .content-block
          .content-block--body
            h1 WEA designs 
              span {{ examples[exampleIndex] }}
            h3 Start a new idea and build your community through discussion and debate.
    .row
      .content-block.pull-up.white-block
        .content-block--body
    site-footer
</template>

<script>
import { mapGetters } from 'vuex'

import PageHeader from '@/components/PageHeader'
import SiteFooter from '@/components/navigation/SiteFooter'

export default {
  name: 'wea',
  components: {
    PageHeader,
    SiteFooter
  },
  created () {
    setInterval(() => {
      this.exampleIndex = (this.exampleIndex === this.examples.length - 1) ? 0 : this.exampleIndex + 1
    }, 2000)
  },
  data () {
    return {
      exampleIndex: 0,
      examples: ['events', 'courses', 'products', 'protests', 'services', 'meetups']
    }
  },
  computed: {
    ...mapGetters(['navColor'])
  }
}
</script>

<style lang="stylus" scoped>
@import '~stylus/shared'

#home
  position relative
  text-align center

  .content-block--body
    min-height 800px

  .row-wrapper
    &#welcome
      background-color $color-primary
      .content-block
        reset()
        .content-block--body
          min-height auto
          padding-top 100px
          padding-bottom 120px
          h1, h3
            reset()
            color white
            font-weight normal
          h1 span
            color white
            display inline-block
            font-weight bold
            overflow visible
            width 100px
            text-align left
            @media(max-width: 580px)
              display block
              text-align center
</style>
