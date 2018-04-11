<template lang="pug">
  #home
    .row-wrapper#welcome(v-bind:style="[instanceBackground]")
      .row
        .content-block
          .content-block--body
            h1 Wingrove
            h3 A place for idea development
    
    splash-image(align="center" title="Collaborative" subtitle="Ideaboard brings people together in an online space to ask questions and make decisions." action="Learn More" link="/learn" image="")
    
    //- featured-ideas

    //- splash-image(align="center" title="Ready when you are." subtitle="When you've had a good look around the site and you're ready to start your own idea just click the button below." action="Start an Idea" link="/start" image="")

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
</style>
