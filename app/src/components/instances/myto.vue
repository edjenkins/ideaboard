<template lang="pug">
  #home
    .row-wrapper#welcome(v-bind:style="[instanceBackground]")
      .row
        .content-block
          .content-block--body
            img(src="~images/logos/myto/logo-white.svg")
    
    .row-wrapper#myto-sprint
      .row
        .content-block
          p #[strong Myto] is a distributed, connected series of #[strong design events] across Europe in March-April 2018 that will bring together people living with #[strong Mitochondrial Disease] with designers and researchers to create ideas that respond to their experiences of life with the condition.

    #myto-locations.row-wrapper
      .row
        .content-block
          .location#newcastle
            h1 England, UK
            h5 When?
            h2 24-25th  March
            h5 Where?
            h3 Newcastle
            router-link.btn.btn-rounded.get-involved(v-bind:to="{ name: 'explore', params: { category: 'newcastle' } }") Explore Ideas
          .location#netherlands
            h1 Netherlands
            h5 When?
            h2 7-8th  April
            h5 Where?
            h3 Lunteren
            router-link.btn.btn-rounded.get-involved(v-bind:to="{ name: 'explore', params: { category: 'netherlands' } }") Explore Ideas
          .location#rome
            h1 Italy
            h5 When?
            h2 14-15th  April
            h5 Where?
            h3 Rome
            router-link.btn.btn-rounded.get-involved(v-bind:to="{ name: 'explore', params: { category: 'rome' } }") Explore Ideas
          .clearfix

    splash-image(align="left" title="What is Ideaboard?" subtitle="This website is a tool to help the Mito community – online and offline – to engage in ideation around the design ideas from each of these events." action="Read More" link="/learn" image="")

    //- featured-ideas

    site-footer
</template>

<script>
import Home from '@/mixins/Home'

export default {
  name: 'myto',
  metaInfo: {
    title: 'Myto'
  },
  mixins: [Home]
}
</script>

<style lang="stylus" scoped>

@import '~stylus/home'
@import url('https://fonts.googleapis.com/css?family=Patua+One');
#welcome
  
  img
    max-width 400px

#myto-sprint.row-wrapper
  reset()
  margin-top 60px
  .row
    .content-block
      gradient()
      radius(20px)
      background-color #EE3746
      margin 0 10px
      padding 4% 10%
      h1, p
        reset()
        color white
      p
        font-size 1.2em

#myto-locations.row-wrapper
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
    @media(max-width: 560px)
      min-height 300px
      .btn.btn-rounded.get-involved
        left 30px
        right 30px
        max-width 100%
      h3
        margin-bottom 10px

</style>
