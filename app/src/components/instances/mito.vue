<template lang="pug">
  #home
    .row-wrapper#welcome(v-bind:style="{ 'background-color': navColor }")
      .row
        .content-block
          .content-block--body
            h1 Welcome to Myto
            h3 A place for online discussion to help improve the lives of people with mitochonryial disease.
    
    splash-image(align="right" title="Collaborate" subtitle="Experts will review your thoughts and ideas overnight and give constructive feedback." action="Learn More" link="/learn" image="")
    featured-ideas
    splash-image(align="left" title="Ready to share?" subtitle="When you've had a good look around the site and you're ready to start your own idea just click the button below." action="Start an Idea" link="/start" image="")

    site-footer
</template>

<script>
import Home from '@/mixins/Home'

export default {
  name: 'mito',
  metaInfo: {
    title: 'Mito'
  },
  mixins: [Home]
}
</script>

<style lang="stylus" scoped>
@import '~stylus/home'
</style>
