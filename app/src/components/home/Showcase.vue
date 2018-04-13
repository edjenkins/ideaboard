<template lang="pug">
.row-wrapper#showcase
  .row
    .content-block
      .content-block--body
        ul.showcase
          li(v-for="(showcase, index) in showcases" v-bind:key="index")
            a(v-bind:href="showcase.link")
              .showcase--image(v-bind:style="showcase.image | resize('320', '180') | background")
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
          title: 'Myto',
          description: 'A series of workshop events for people with mitochondrial disease.',
          link: 'https://myto.ideaboard.co.uk',
          image: 'https://ideaboard.s3.eu-west-2.amazonaws.com/uploads/a68b29a221a668b78754d3819b16df821521974551654.png',
          color: '#0B9BD0'
        },
        {
          title: 'CityLit',
          description: 'We collected ideas from our students for new courses using Ideaboard.',
          link: 'https://citylit.ideaboard.co.uk',
          image: 'https://s3.amazonaws.com/xmovement/ideaboard/assets/stock/rawpixel-com-196464-unsplash.jpg',
          color: '#7e179f'
        },
        {
          title: 'Newcastle University',
          description: 'We used Ideaboard to dynamically organise study sessions for students.',
          link: 'https://ncl.ideaboard.co.uk',
          image: 'https://s3.amazonaws.com/xmovement/ideaboard/assets/stock/becca-tapert-391599-unsplash.jpg',
          color: '#003865'
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['instanceBackground'])
  }
}
</script>

<style lang="stylus" scoped>

@import '~stylus/home'

#showcase
  background-color $color-lightest-grey
  background-color white
  .content-block
    ul.showcase
      cleanlist()
      margin 0 -10px
      li
        radius(10px)
        cleanlist()
        border-box()
        nav-shadow()
        background-color white
        float left
        margin 20px
        overflow hidden
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
            border-bottom white 3px solid            
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
