<template lang="pug">
  #home
    .row-wrapper#welcome(v-bind:style="[instanceBackground]")
      .row
        .content-block
          .content-block--body
            img(src="~images/logos/myto/logo-white.svg")
    
    .row-wrapper#myto-info
      .row
        .content-block
          p #[strong Myto] was a distributed, connected series of #[strong design events] across Europe in March-April 2018 that brought people living with #[strong Mitochondrial Disease] together with designers and researchers to create ideas that respond to their experiences of life with the condition.

    .row-wrapper#myto-locations
      .row
        .content-block
          .location#newcastle
            h1 England
            h5 When?
            h2 March 2018
            h5 Where?
            h3 Newcastle
            router-link.btn.btn-rounded.get-involved(v-bind:to="{ name: 'explore', params: { category: 'newcastle' } }") Explore Ideas
          .location#netherlands
            h1 Netherlands
            h5 When?
            h2 April 2018
            h5 Where?
            h3 Lunteren
            router-link.btn.btn-rounded.get-involved(v-bind:to="{ name: 'explore', params: { category: 'netherlands' } }") Explore Ideas
          .location#rome
            h1 Italy
            h5 When?
            h2 April 2018
            h5 Where?
            h3 Rome
            router-link.btn.btn-rounded.get-involved(v-bind:to="{ name: 'explore', params: { category: 'rome' } }") Explore Ideas
          .clearfix

    collaborate(align="right" title="Collaborate" subtitle="Contribute in an online space and help form ideas, ask questions and make decisions." action="Learn More" link="/learn")

    .row-wrapper#myto-winners
      .row
        .content-block
          .winners
            h2 Winners
            //- p Here are the ideas that will be funded going forwards.
            p These ideas have been chosen by a team of experts in digital design and Mitochondrial Disease as the best ideas from each country’s design event. Each idea team will receive part of our prize pot to build a working prototype, or early version, of their idea. Once these are built and ready to go, we’ll post them on the website and let you know how to access them!
            .ideas-wrapper
              router-link.content-block.content-block--tile.pull-left(v-for="(idea, index) in ideas" v-bind:to="{ name: 'idea', params: { id: idea._id } }" tag="div" v-bind:key="index")
                idea-tile(v-bind:idea="idea")
              //- idea-tile(v-for="(idea, index) in ideas" :key="index" :idea="idea")
              .clearfix
          .message
            //- h2 Questions?
            p Please note: We try to involve people with mito in the design of these technologies and services as much as possible from the ground up; therefore, the creation of some of these resources may take a little more time than expected. If you’re wondering where a particular idea is at in the development process, check with Kellie at #[a(href="mailto:kellie.morrissey@newcastle.ac.uk") kellie.morrissey@newcastle.ac.uk].

    //- ready(title="Ready?" subtitle="When you've had a good look around and you're ready to start your own idea just click the button below." action="Start an Idea" link="/start")

    site-footer
</template>

<script>
import API from '@/api'
import Home from '@/mixins/Home'
import IdeaTile from '@/components/ideas/IdeaTile'

export default {
  name: 'myto',
  metaInfo: {
    title: 'Myto'
  },
  mixins: [Home],
  components: {
    IdeaTile
  },
  mounted () {
    this.fetchIdeas()
  },
  data () {
    return {
      winners: ['5ab66ef6b9935a007524992c', '5ac8943a527a7200acf72a9c', '5ad1d186a279ce005d70d01a'],
      ideas: []
    }
  },
  methods: {
    fetchIdeas () {
      this.ideas = []
      this.winners.forEach(ideaId => {
        API.idea.view(
          ideaId,
          (response) => {
            // Idea success
            this.$log(response)
            this.ideas.push(response.data.idea)
          },
          (error) => {
            // Idea fail
            this.$log(error)
          })
      })
    }
  }
}
</script>

<style lang="stylus" scoped>

@import '~stylus/home'
@import url('https://fonts.googleapis.com/css?family=Patua+One');

#welcome
  img
    max-width 400px

#myto-info.row-wrapper
  reset()
  padding 10px 0
  margin-top -80px
  .row
    .content-block
      gradient()
      // radius(20px)
      background-color #EE3746
      margin 0 auto
      max-width 800px
      padding 5%
      h1, p
        reset()
        color white
      p
        font-size 1.2em

.row-wrapper#myto-winners
  background-color white
  padding 80px 0
  .message
    border $color-lighter-grey 1px solid
    color $color-text-grey
    margin 20px
    padding 40px
    text-align left
  // h2
  //   reset()
  //   color $color-text-grey
  //   font-size 2em
  p
    reset()
    color $color-text-grey
    font-size 1.2em
    margin 20px auto 20px auto
    max-width 800px
  .ideas-wrapper
    padding 10px
    max-width $page-width + 20px
    @media(max-width: 1040px)
      margin 0 10px
      padding 10px 0

    .content-block--tile
      border $color-lighter-grey 1px solid
      box-sizing border-box
      margin 10px
      padding 0
      width calc((100% / 3) - 20px)
      @media(max-width: 860px)
        width calc((100% / 3) - 20px)
      @media(max-width: 640px)
        width calc((100% / 2) - 20px)
      @media(max-width: 380px)
        width calc((100% / 1) - 20px)

.row-wrapper#myto-locations
  reset()
  margin 0
  padding 60px 0 60px 0
  .location
    border-box()
    box-sizing()
    radius(20px)
    float left
    min-height 360px
    margin 10px
    overflow hidden
    padding 40px
    position relative
    text-align left
    width calc(33.33333% - 20px)
    h1, h2, h3, h5
      reset()
      text-overflow ellipsis
      -webkit-text-overflow ellipsis
      overflow hidden
      white-space nowrap
    h1
      font-family 'Patua One', cursive
      font-size 1.9em
      margin-bottom 20px
      text-transform uppercase
    h2
      font-size 1.5em
    h3
      font-size 1.3em
      margin-bottom 20px
      
    .btn.btn-rounded.get-involved
      radius(30px)
      top auto
      bottom 30px
      left 30px
      right 30px
      background-color transparent
      border white 2px solid
      font-weight bold
      position absolute

    &#newcastle
      background-color #DC155D
      h1, h2, h3, h5, .btn
        color #F2CB46
      .btn
        border-color #F2CB46
    &#netherlands
      background-color #F2CB46
      h1, h2, h3, h5, .btn
        color #f5353d
      .btn
          border-color #f5353d
    &#rome
      background-color #62C2BE
      h1, h2, h3, h5, .btn
        color #DC155D
      .btn
        border-color #DC155D

    @media(max-width: 960px)
      min-height 160px
      width calc(100% - 20px)
      .btn.btn-rounded.get-involved
        left auto
        right 30px
        max-width 100%
      h3
        margin-bottom 10px
    @media(max-width: 568px)
      radius(0px)
      margin 0
      min-height 300px
      max-width 100%
      width 100%
      .btn.btn-rounded.get-involved
        left 30px
        right 30px
        max-width 100%
      h3
        margin-bottom 10px


#ideaboard
  padding 0 10px 60px 10px !important
  position relative
  margin 0 40px

  .content-block
    radius(20px)
    background-color $color-primary
    max-width 800px
    margin 0 auto !important
    padding 30px 30px !important
    h2
      reset()
      color white
      font-size 2em
    p
      reset()
      color white
      margin 10px auto
      max-width 640px
    #ideaboard-banner--action
      animate()
      radius(30px)
      background-color transparent
      border white 1px solid
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
  @media(max-width: 568px)
    padding 0 !important
    .content-block
      radius(0)

</style>
