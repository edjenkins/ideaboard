<template lang="pug">
  #home
    .row-wrapper#welcome(v-bind:style="[instanceBackground]")
      .row
        .content-block
          .content-block--body
            img(src="~images/logos/comtech/cntlogo.png" style="height: 150px; margin-bottom: 10px;")
            h1 Communities and Technologies
            h3 3 - 7 June 2019, TU Wien, Vienna, Austria


    collaborate(align="right" title="Collaborate" subtitle="An online space to form ideas, ask questions and make decisions." action="Learn More" link="/learn" v-bind:styles="{ 'background-color': '#c84345' }")
    featured-ideas
    ready(title="Ready?" subtitle="When you've had a good look around and you're ready to start your own idea just click the button below." action="Start an Idea" link="/start")
    
    site-footer
</template>

<script>
import Home from '@/mixins/Home'

export default {
  name: 'comtech',
  metaInfo: {
    title: 'Communities and Technologies'
  },
  mixins: [Home]
}
</script>

<style lang="stylus" scoped>
@import '~stylus/home'
#myto-info.row-wrapper
  reset()
  padding 10px 0
  margin-top -80px
  .row
    .content-block
      color #333
      gradient()
      // radius(20px)
      background-color #fff
      margin 0 auto
      max-width 800px
      padding 5%
      h1, p
        reset()
        color #333
      p
        font-size 1.2em
</style>
