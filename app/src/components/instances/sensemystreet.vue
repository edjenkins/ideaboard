<template lang="pug">
  #home
    .row-wrapper#welcome(v-bind:style="[instanceBackground]")
      .row
        .content-block
          .content-block--body
            img(src="https://ideaboard.co.uk/static/images/logos/sms/logo-white.svg")
    
    collaborate(align="right" title="Collaborate" subtitle="An online space to form ideas, ask questions and make decisions." action="Learn More" link="/learn" v-bind:styles="{ 'background-color': '#041e41' }")
    featured-ideas
    ready(title="Ready?" subtitle="When you've had a good look around and you're ready to start your own idea just click the button below." action="Start an Idea" link="/start")
    
    site-footer(v-bind:style="{ 'background-color': 'white' }")
</template>

<script>
import Home from '@/mixins/Home'

export default {
  name: 'openlab',
  metaInfo: {
    title: 'Open Lab'
  },
  mixins: [Home]
}
</script>

<style lang="stylus" scoped>
@import '~stylus/home'

img
  height 280px
  max-width 100%
</style>
