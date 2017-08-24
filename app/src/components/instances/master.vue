<template lang="pug">
  #home
    .row-wrapper#welcome(v-bind:style="{ 'background-color': navColor }")
      .row
        .content-block
          .content-block--body
            h1 Design 
              .example {{ examples[exampleIndex] }}
            h3 Start a new idea and build your community through discussion and debate.
    
    splash-image(align="right" title="Collaborative Design" subtitle="IdeaBoard is all about bringing people together in an online space to make decisions around specific topics." action="Learn More" link="/learn" image="https://images.pexels.com/photos/6224/hands-people-woman-working.jpg?w=940&h=650&auto=compress&cs=tinysrgb")
    showcase
    splash-image(align="left" title="Ready when you are." subtitle="When you've had a good look around the site and you're ready to start your own idea just click the button below." action="Create your Idea" link="/create" image="https://images.pexels.com/photos/212286/pexels-photo-212286.jpeg?w=940&h=650&auto=compress&cs=tinysrgb")

    site-footer
</template>

<script>
import Home from '@/mixins/Home'

export default {
  name: 'master',
  mixins: [Home]
}
</script>

<style lang="stylus" scoped>
@import '~stylus/home'
</style>
