<template lang="pug">
.row-wrapper#showcase
  .row
    .content-block
      .content-block--body
        h3 People using IdeaBoard
        ul.showcase
          li(v-for="(showcase, index) in showcases" v-bind:key="index")
            a(v-bind:href="showcase.link")
              .showcase--image(v-bind:style="{ 'background-image': `url(${ showcase.image })` }")
              .showcase--title {{ showcase.title }}
              .showcase--description {{ showcase.description }}
          .clearfix
</template>

<script>
export default {
  name: 'showcase',
  data () {
    return {
      showcases: [
        {
          title: 'WEA',
          description: 'IdeaBoard proved to be a great way to connect with our adult learners.',
          link: 'https://wea.ideaboard.co.uk',
          image: 'https://static.pexels.com/photos/574285/pexels-photo-574285.jpeg'
        },
        {
          title: 'CityLit',
          description: 'We collected ideas from our students for new courses using IdeaBoard.',
          link: 'https://citylit.ideaboard.co.uk',
          image: 'https://static.pexels.com/photos/7096/people-woman-coffee-meeting.jpg'
        },
        {
          title: 'Newcastle University',
          description: 'We used IdeaBoard to dynamically organise study sessions for students.',
          link: 'https://ncl.ideaboard.co.uk',
          image: 'https://static.pexels.com/photos/287335/pexels-photo-287335.jpeg'
        }
      ]
    }
  }
}
</script>

<style lang="stylus" scoped>

@import '~stylus/home'

#showcase
  .content-block
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
