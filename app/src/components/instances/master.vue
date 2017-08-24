<template lang="pug">
  #home
    .row-wrapper#welcome(v-bind:style="{ 'background-color': navColor }")
      .row
        .content-block
          .content-block--body
            h1 Design 
              .example {{ examples[exampleIndex] }}
            h3 Start a new idea and build your community through discussion and debate.
    .row
      .content-block#featured
        .content-block--body
          h3 Featured Ideas
          featured-ideas

      .content-block#showcase
        .content-block--body
          h3 People using IdeaBoard
          ul.showcase
            li(v-for="(showcase, index) in showcases" v-bind:key="index")
              a(v-bind:href="showcase.link")
                .showcase--image(v-bind:style="{ 'background-image': `url(${ showcase.image })` }")
                .showcase--title {{ showcase.title }}
                .showcase--description {{ showcase.description }}
            .clearfix

      .content-block
        .splash-image(v-bind:style="{ 'background-image': 'url(https://images.pexels.com/photos/212286/pexels-photo-212286.jpeg?w=940&h=650&auto=compress&cs=tinysrgb)' }")
          .splash-image--content
            h2 Ready when you are.
            p When you've had a good look around the site and you're ready to start your own idea just click the button below.
            router-link.splash-image--action(to="/create") Create your Idea


    site-footer
</template>

<script>
import Home from '@/mixins/Home'
import FeaturedIdeas from '@/components/ideas/FeaturedIdeas'

export default {
  name: 'master',
  metaInfo: {
    title: 'Home'
  },
  mixins: [Home],
  components: {
    FeaturedIdeas
  },
  data () {
    return {
      showcases: [
        {
          title: 'WEA',
          description: 'IdeaBoard proved to be a great way to connect with our adult learners.',
          link: 'https://wea.eventspark.co.uk',
          image: 'https://images.pexels.com/photos/509799/pexels-photo-509799.jpeg?w=940&h=650&auto=compress&cs=tinysrgb'
        },
        {
          title: 'CityLit',
          description: 'We collected ideas from our students for new courses using IdeaBoard.',
          link: 'https://citylit.eventspark.co.uk',
          image: 'https://images.pexels.com/photos/7096/people-woman-coffee-meeting.jpg?w=940&h=650&auto=compress&cs=tinysrgb'
        },
        {
          title: 'Newcastle University',
          description: 'We used IdeaBoard to dynamically organise study sessions for students.',
          link: 'https://ncl.eventspark.co.uk',
          image: 'https://images.pexels.com/photos/7374/startup-photos.jpg?w=940&h=650&auto=compress&cs=tinysrgb'
        }
      ]
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~stylus/home'

#home
  .splash-image
    background-image()
    position relative
    width 100%
    .splash-image--content
      margin-right 50%
      background-color alpha($color-primary, 1)
      padding 50px 30px
      h2
        reset()
        color white
        font-size 2em
      p
        reset()
        color white
        margin 20px auto 30px auto
      .splash-image--action
        animate()
        radius(30px)
        background-color transparent
        border white 2px solid
        color white
        display inline-block
        font-weight bold
        line-height 60px
        margin 0 20px
        padding 0 40px
        text-align center
        text-decoration none
        &:hover
          cursor pointer
          background-color alpha(black, 0.05)

    @media(max-width: 640px)
      .splash-image--content
        margin-right auto

  #showcase, #featured
    .content-block--body
      padding 0
      h3
        color $color-text-grey
        text-align left
        @media(max-width: ($page-width + 10px))
          padding 0 10px

  .content-block#showcase
    ul.showcase
      cleanlist()
      margin -10px
      li
        cleanlist()
        border-box()
        background-color white
        float left
        margin 10px
        width calc(calc(100% / 3) - 20px)
        @media(max-width: 640px)
          width calc(calc(100% / 2) - 20px)
          &:first-child
            width calc(calc(100% / 1) - 20px)
        @media(max-width: 480px)
          width calc(calc(100% / 1) - 20px)
        a
          text-align left
          text-decoration none
          .showcase--image
            background-image()
            height 160px
          .showcase--title
            reset()
            color $color-text-dark-grey
            font-weight bold
            padding 20px 20px 10px 20px
          .showcase--description
            reset()
            color $color-text-grey
            padding 0 20px 20px 20px
</style>
