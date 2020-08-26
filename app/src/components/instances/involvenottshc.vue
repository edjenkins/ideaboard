<template lang="pug">
  #home
    .row-wrapper#welcome(v-bind:style="[instanceBackground]")
      .row
        .content-block
          .content-block--body.demvr-welcome
            h1 InvolveNottsHC
            h3 If you want to go fast, go alone. If you want to go far, go together

    .row-wrapper#comtech-info
      .color
      .row
        .content-block
          p The Involvement, Experience & Volunteering Team at Nottinghamshire Healthcare NHS use this space to host and document various projects we are working on. The aim is to promote co-production and collaboration across the NHS Trust.  

    .row-wrapper#group-intro
      .color
      .row
        .content-block
          h2 Patient Information Group (PIG)
          p Notts healthcare involvement team has a group of volunteers who work with the different services and teams across the organisation looking at the information that we produce for the use of everyone who has contact with us. 

          p The group work to ensure the all information is easily accessible, user friendly sometimes wording can be very corporate and long winded this group tries to ensure the information going out is direct to the point and easily digestible for all.

          p To view some of the pieces of work this group has already been involved in please click 
            a(href="https://involve.nottshc.nhs.uk/blog/index.php/involvement-projects/") here

          p PIG allows for people to join the conversation about projects we are working on and help to produce valued information. You will be able to make comments, suggestions and see that you are helping to produce vital information you will also have the opportunity to work with a great group of people. It will also allow for pieces of work that go alongside other projects around the Trust the option to discuss and work together making for a more collaborative approach. 

          p If you would like more information, please contact 
            a(href="mailto:lyndsy.jones@nottshc.nhs.uk") lyndsy.jones@nottshc.nhs.uk 
          

    collaborate(align="left" id="w-propose-workshop" title="Propose a new idea" subtitle="Write a short description of your proposed workshop topic and post it on the site."  v-bind:styles="{ 'background-color': '#fff'}" theme="dark" imageSrc="/static/images/illustrations/comtech/idea2.svg" )
    collaborate(align="right" id="w-collaborate" title="Collaborate" subtitle="Share your idea with the wider community and invite others to help you shape the workshop."  v-bind:styles="{ 'background-color': '#0170cd' }"  imageSrc="/static/images/illustrations/comtech/share2.svg")
    collaborate(align="left" id="w-design" title="Design together" subtitle="Use the online space to form ideas, ask questions and make decisions about the workshop proposal." v-bind:styles="{ 'background-color': '#feb91c'}" theme="dark" imageSrc="/static/images/illustrations/comtech/design2.svg")
    collaborate(align="right" id="w-produce" title="Produce your project action plan" subtitle="When you’ve made all your decisions it’s time to draft the workshop proposal and submit to C&T." imageSrc="/static/images/illustrations/comtech/produce2.svg"  v-bind:styles="{ 'background-color': '#8b1438'}" )
    featured-ideas
    ready(title="Ready?" subtitle="When you've had a good look around and you're ready to start your own idea just click the button below." action="Propose an Idea" link="/start" backgroundColor="#0170cd" buttonTextColor='#fff')
    
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
    text-decoration-color: #feb91c
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
      background-color #0170cd
      margin 0 auto
      margin-top -160px
      max-width 800px
      padding 5%
      h1, p
        reset()
        color #fff
      p
        font-size 1.1em
        margin-bottom 10px

#group-intro.row-wrapper
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
      padding 10px 0 30px 0  
      max-width 800px
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
        color: #0170cd;
      h3
        font-size: 1em
        color: #8b96a1;
        text-decoration: underline;
        text-decoration-color: #ffe261;
      h2 
        font-size 2em
      h2, h3, h4
        margin 15px




</style>
