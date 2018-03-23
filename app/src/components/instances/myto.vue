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
          p #[strong Myto] is a distributed, connected series of #[strong design events] across Europe in March-April 2018 that will bring together people living with #[strong Mitochondrial Disease] with designers and researchers to create ideas that respond to their experiences of life with the condition.

    .row-wrapper#myto-locations
      .row
        .content-block
          .location#newcastle
            h1 England
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

    //- .row-wrapper#ideaboard
      .row
        .content-block
          h2 Ideaboard
          p #[strong Ideaboard] is an online tool that allows anyone to share and discuss ideas online. #[strong Myto] is using it during a series of two day workshops to have a rich online design event.
          //- router-link#ideaboard-banner--action(v-bind:to="{ name: 'about' }") Learn more

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

#myto-info.row-wrapper
  reset()
  padding 10px
  margin-top -80px
  .row
    .content-block
      gradient()
      radius(20px)
      background-color #EE3746
      margin 0 auto
      max-width 800px
      padding 4% 8%
      h1, p
        reset()
        color white
      p
        font-size 1.2em

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
