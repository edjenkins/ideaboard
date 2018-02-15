<template lang="pug">
.row-wrapper#showcase
  .row
    .content-block
      .content-block--body
        ul.showcase
          li(v-for="(showcase, index) in showcases" v-bind:key="index")
            a(v-bind:href="showcase.link")
              .showcase--image(v-bind:style="{ 'background-image': `url(${ showcase.image })` }")
              .showcase--title {{ showcase.title }}
              .showcase--description {{ showcase.description }}
          .clearfix
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'showcase',
  data () {
    return {
      showcases: [
        {
          title: 'WEA',
          description: 'Ideaboard proved to be a great way to connect with our adult learners.',
          link: 'https://wea.ideaboard.co.uk',
          image: ''
        },
        {
          title: 'CityLit',
          description: 'We collected ideas from our students for new courses using Ideaboard.',
          link: 'https://citylit.ideaboard.co.uk',
          image: ''
        },
        {
          title: 'Newcastle University',
          description: 'We used Ideaboard to dynamically organise study sessions for students.',
          link: 'https://ncl.ideaboard.co.uk',
          image: ''
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['navColor'])
  }
}
</script>

<style lang="stylus" scoped>

@import '~stylus/home'

#showcase
  .content-block
    ul.showcase
      cleanlist()
      margin 0 -10px
      li
        cleanlist()
        border-box()
        background-color white
        float left
        margin 20px
        width calc(calc(100% / 3) - 40px)
        @media(max-width: 640px)
          width calc(calc(100% / 2) - 40px)
          &:first-child
            width calc(calc(100% / 1) - 40px)
        @media(max-width: 480px)
          width calc(calc(100% / 1) - 40px)
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
