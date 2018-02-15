<template lang="pug">
  #home
    .row-wrapper#welcome(v-bind:style="{ 'background-color': navColor }")
      .row
        .content-block
          .content-block--body
            h1 WEA design 
              .example {{ examples[exampleIndex] }}
            h3 Create an idea and begin building a strong community through discussion.
    
    splash-image(align="right" title="Collaborative" subtitle="Ideaboard brings people together in an online space to ask questions and make decisions." action="Learn More" link="/learn" image="https://cdn.dribbble.com/users/533687/screenshots/3749393/caseone-illustration4-mikepiechota.png")
    featured-ideas
    splash-image(align="left" title="Ready when you are." subtitle="When you've had a good look around the site and you're ready to start your own idea just click the button below." action="Create your Idea" link="/create" image="https://cdn.dribbble.com/users/2559/screenshots/2732117/helpshift-illus.gif")

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
