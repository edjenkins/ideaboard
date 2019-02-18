<template lang="pug">
  #home
    .row-wrapper#welcome(v-bind:style="[instanceBackground]")
      .row
        .content-block
          .content-block--body.demvr-welcome
            h1 DemVR
            h3 5-7th April, 2019, Hancock Museum - Exhibition Space

    .row-wrapper#comtech-info
      .color
      .row
        .content-block
          p We are running DemVR, a two-day hackathon, bringing together people who are interested in creating meaningful experiences for people living with dementia using Virtual Reality (VR). During the hackathon, our academic and industry experts in dementia and VR will be on hand to run skill workshops and provide advice. We will help you form your dream team and make your idea a reality!
 
          p Ideas could include (but are not limited to) physical design of VR headsets, how space and VR space can be used for sharing, addition of other senses, personalisation of VR environments, and positioning the person with dementia as the active user. While the hackathon isn’t running until 5th – 7th April, get started today by joining a team and developing an idea, or pitch something new in order to create a space for you and others alike.

    .row-wrapper#important-dates
      .color
      .row
        .content-block
          h2 Important Dates
          ul
            li 
              h2 
                i.fas.fa-calendar-alt
              h3 March 15th, 2019
              h4 Submit an outline of your proposed idea
            li 
              h2 
                i.fas.fa-calendar-alt
              h3 March 22nd, 2019 
              h4 Experts will provide feedback for your ideas
            li 
              h2 
                i.fas.fa-calendar-alt
              h3 March 29th, 2019
              h4 Teams respond to the expert feedback
            li 
              h2 
                i.fas.fa-calendar-alt
              h3 April 5th – 7th, 2019 
              h4 Hackathon takes place
          

    collaborate(align="left" id="w-propose-workshop" title="Propose your Virtual Reality Idea" subtitle="Write a short description of your VR idea. Ideas should be focused on how we might create enriching VR experiences for people living with dementia. Click here to learn more!"  v-bind:styles="{ 'background-color': '#fff'}" theme="dark" imageSrc="/static/images/illustrations/demvr/VRideaOne.svg" )
    collaborate(align="right" id="w-collaborate" title="Collaborate" subtitle="Share your idea with the wider community. Invite others to build up your team and help develop the idea."  v-bind:styles="{ 'background-color': '#c35360' }" imageSrc="/static/images/illustrations/demvr/CollabTwo.svg")
    collaborate(align="left" id="w-design" title="Ask the Experts" subtitle="Something you are unsure of? Don’t worry, we have experts in VR and Dementia ready to help. Ask questions and get feedback from experts to help you develop the idea further." v-bind:styles="{ 'background-color': '#f7f7f7'}" theme="dark" imageSrc="/static/images/illustrations/demvr/ExpertsThree.svg")
    collaborate(align="right" id="w-produce" title="Attend the Hackathon" subtitle="Come along to Newcastle and take part in a two-day hackathon focused on making your ideas a reality! " imageSrc="/static/images/illustrations/demvr/HackathonFour.svg"  v-bind:styles="{ 'background-color': '#93a0ae'}" )
    featured-ideas
    ready(title="Ready?" subtitle="When you've had a good look around and you're ready to start your own idea just click the button below." action="Propose an Idea" link="/start" backgroundColor="#ffdd57" buttonTextColor='rgba(0,0,0,0.7)')
    
    site-footer
</template>

<script>
import Home from '@/mixins/Home'

export default {
  name: 'demvr',
  metaInfo: {
    title: 'DemVR'
  },
  mixins: [Home],
  methods: {
    scrollToSection (element) {
      return () => {
        // document.getElementById(element).scrollIntoView()
        this.scrollToElement(element)
      }
    },
    scrollToElement (element, scrollDuration = 500) {
      var doc = document.documentElement
      var frameDuration = 15
      const left = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0)
      const startingPosition = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0)
      const endingPosition = document.querySelector('#' + element).offsetTop
      const scrollDistance = endingPosition - startingPosition
      const totalFrames = scrollDuration / frameDuration
      var currentFrame = 0
      var scrollMargin
      var scrollInterval = setInterval(() => {
        var normalizedDistance = currentFrame / totalFrames
        if (normalizedDistance < 0.5) {
          scrollMargin = this.easing(normalizedDistance * 2) * scrollDistance / 2
        } else {
          scrollMargin = scrollDistance - this.easing((1 - normalizedDistance) * 2) * scrollDistance / 2
        }
        window.scrollTo(left, (startingPosition + scrollMargin))
        if (currentFrame >= totalFrames) {
          // document.getElementById(element).scrollIntoView()
          clearInterval(scrollInterval)
          return
        }
        currentFrame = currentFrame + 1
      }, frameDuration)
    },
    easing (x) {
      return 1.0 - Math.sin(Math.PI * 0.5 * (1 - x))
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~stylus/home'
#welcome.row-wrapper
  padding-bottom: 80px;
#welcome .demvr-welcome 
  color: #363636 !important
  h1
    color: #363636 !important
    text-decoration: underline
    text-decoration-color: #ffdd57
    font-size 3.4rem !important
  h2, h3
    color: #363636 !important
#comtech-info.row-wrapper
  reset()
  padding 10px 0
  // margin-top -80px
  position: relative;
  background: #f6f6f6;
  .color
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    gradient()
  .row
    .content-block
      color #fff
      //gradient()
      // radius(20px)
      background-color #c35360
      margin 0 auto
      margin-top -170px
      max-width 800px
      padding 5%
      h1, p
        reset()
        color #fff
      p
        font-size 1.1em
        margin-bottom 10px

#important-dates.row-wrapper
  reset()
  padding 10px 0
  // margin-top -80px
  position relative
  background #f6f6f6
  .color
    position absolute
    left 0
    right 0
    top 0
    bottom 0
    gradient()
  .row
    .content-block
      color #444
      // radius(20px)
      margin 0 auto
      //margin-top -170px
      padding 10px 0  
      h1, p
        reset()
        color #333
      p
        font-size 1.1em
        margin-bottom 10px
      ul
        display flex
        flex-direction row
        flex-wrap wrap
        justify-content center
        padding 0
        li
          list-style-type none
          display inline-block
          transition margin 0.2s;
          max-width 180px
          margin 10px 10px
          background #fff
          border-box()
          box-sizing()
          radius(2px)
          padding 10px 20px
          color #363636
          &:hover
            margin-top: 5px
            margin-bottom 15px
          h2, h3
            color: #f7b908;
          h3
            font-size: 1em
            color: #8b96a1;
            text-decoration: underline;
            text-decoration-color: #ffe261;
          h4 
            font-size 0.9em
          h2, h3, h4
            margin 15px




</style>
