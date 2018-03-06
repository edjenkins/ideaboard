<template lang="pug">
  #home
    .row-wrapper#welcome(v-bind:style="{ 'background-color': navColor }")
      .row
        .content-block
          .content-block--body
            h1 WEA design 
              .example {{ examples[exampleIndex] }}
            h3 Start an idea and begin building a strong community through discussion.
    
    splash-image(align="right" title="Collaborative" subtitle="Ideaboard brings people together in an online space to ask questions and make decisions." action="Learn More" link="/learn" image="")
    featured-ideas
    splash-image(align="left" title="Ready when you are." subtitle="When you've had a good look around the site and you're ready to start your own idea just click the button below." action="Start an Idea" link="/start" image="")

    site-footer
</template>

<script>
import Home from '@/mixins/Home'

export default {
  name: 'wea',
  metaInfo: {
    title: 'WEA'
  },
  mixins: [Home]
}
</script>

<style lang="stylus" scoped>
@import '~stylus/home'
</style>
