<template lang="pug">
  #home
    .row-wrapper#welcome
      .row
        .content-block
          .content-block--body
            h1 Communities designing 
              span {{ examples[exampleIndex] }}
            h3 Start a new idea and build your community through discussion and debate.
    .row
      .content-block.pull-up.white-block
        .content-block--body
          p {{ instance }}
    site-footer
</template>

<script>
import _ from 'lodash'

import PageHeader from '@/components/PageHeader'
import SiteFooter from '@/components/navigation/SiteFooter'

export default {
  name: 'home',
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
    instance () {
      var subdomain = /:\/\/([^\/]+)/.exec(window.location.href)[1]
      return subdomain
    }
  },
  methods: {
    randomColor () {
      let rand = []
      while (!_.inRange(_.sum(rand), 600, 700)) {
        rand = [_.random(0, 255), _.random(0, 255), _.random(0, 255)]
      }

      return `rgb(${rand[0]}, ${rand[1]}, ${rand[2]})`
    }
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
