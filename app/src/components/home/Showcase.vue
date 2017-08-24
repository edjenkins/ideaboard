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
