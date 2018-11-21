<template lang="pug">
  #home
    .row-wrapper#welcome(v-bind:style="[instanceBackground]")
      .row
        .content-block
          .content-block--body
            img(src="https://ideaboard.co.uk/static/images/logos/comtech/cntlogo3.png" style="height: 150px; margin-bottom: 10px;")
            h1 Communities and Technologies
            h3 3 - 7 June 2019, TU Wien, Vienna, Austria

    .row-wrapper#comtech-info
      .color
      .row
        .content-block
          p #[strong C&T 2019] will host workshops to spark discussion and exchange of experiences among (applied) researchers, practitioners, and professionals working in the field of communities and technologies, as well as non-academic actors – individuals as well as organizations – working with technologies to affect community relations. The workshops provide a platform to discuss, explore and advance specific research areas of Communities &amp; Technologies. Each workshop should provide a forum to generate new, innovative ways of thinking about the topic, or ideas that suggest promising directions for future research. Topics addressed may include (but are not limited to) theories, methodologies, artefacts in practices, emerging application areas, design innovations, strategy and organizational issues pertaining to the overall theme of the conference.

          p C&T Workshops will run for a half or one full day and will take place on #[strong June 3rd and 4th, 2019].

    .row-wrapper#important-dates
      .color
      .row
        .content-block
          h2 Important Dates
          ul
            li 
              h2 
                i.fas.fa-calendar-alt
              h3 February 15, 2019 
                br
                | (23:59 CET) 
              h4 Workshop proposals due
            li 
              h2 
                i.fas.fa-calendar-alt
              h3 March 1, 2019 
              h4 Notification of acceptance for workshop proposals
            li 
              h2 
                i.fas.fa-calendar-alt
              h3 March 8, 2019
                br
                | (23:59 CET)
              h4 Descriptions of accepted workshops due
            li 
              h2 
                i.fas.fa-calendar-alt
              h3 April 20, 2019 
                br 
                | (23:59 CET)
              h4 Workshop papers due
            li 
              h2 
                i.fas.fa-calendar-alt
              h3 June 3-7, 2019
              h4 Workshops and conference in Vienna

    collaborate(align="left" id="w-propose-workshop" title="Propose your workshop topic" subtitle="Write a short description of your proposed workshop topic and post it on the site." action="Next Step" link="" v-bind:styles="{ 'background-color': '#222'}" v-bind:clickaction="scrollToSection('w-collaborate')")
    collaborate(align="right" id="w-collaborate" title="Collaborate" subtitle="Share your idea with the wider community and invite others to help you shape the workshop." action="Next Step" v-bind:clickaction="scrollToSection('w-design')" v-bind:styles="{ 'background-color': 'rgb(200, 67, 69)' }")
    collaborate(align="left" id="w-design" title="Design the workshop" subtitle="Use the online space to form ideas, ask questions and make decisions about the workshop proposal." action="Next Step"  v-bind:clickaction="scrollToSection('w-produce')" v-bind:styles="{ 'background-color': '#f7f7f7'}" theme="dark")
    collaborate(align="right" id="w-produce" title="Produce your workshop proposal" subtitle="When you’ve made all your decisions it’s time to draft the workshop proposal and submit to C&T." action="Propose a Workshop" link="/start"  v-bind:styles="{ 'background-color': '#93a0ae'}" )
    featured-ideas
    ready(title="Ready?" subtitle="When you've had a good look around and you're ready to start your own idea just click the button below." action="Propose a Workshop" link="/start")
    
    site-footer
</template>

<script>
import Home from '@/mixins/Home'

export default {
  name: 'comtech',
  metaInfo: {
    title: 'Communities and Technologies'
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
      const left = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0)
      const scrollHeight = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0)
      const scrollStep = Math.PI / (scrollDuration / 15)
      const cosParameter = scrollHeight / 2
      var scrollCount = 0
      var scrollMargin
      var scrollDirection = (scrollHeight < document.querySelector('#' + element).offsetTop) ? 1 : -1
      var scrollInterval = setInterval(function () {
        var scrollY = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0)
        if (scrollCount > 100) {
          document.getElementById(element).scrollIntoView()
          clearInterval(scrollInterval)
          return
        }
        if (scrollY - scrollDirection * document.querySelector('#' + element).offsetTop <= 0) {
          scrollCount = scrollCount + 1
          scrollMargin = scrollDirection * (cosParameter - cosParameter * Math.cos(scrollCount * scrollStep))
          if ((scrollHeight + scrollMargin) - scrollDirection * scrollDirection * document.querySelector('#' + element).offsetTop > 0) {
            document.getElementById(element).scrollIntoView()
            clearInterval(scrollInterval)
            return
          }
          window.scrollTo(left, (scrollHeight + scrollMargin))
        } else clearInterval(scrollInterval)
      }, 15)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~stylus/home'
#welcome.row-wrapper
  padding-bottom: 80px;
#comtech-info.row-wrapper
  reset()
  padding 10px 0
  // margin-top -80px
  position: relative;
  background: rgb(247, 247, 247);
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
      gradient()
      // radius(20px)
      background-color rgb(200, 67, 69)
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
  background rgb(247, 247, 247)
  .color
    position absolute
    left 0
    right 0
    top 0
    bottom 0
    gradient()
  .row
    .content-block
      color #222
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
          max-width 180px
          margin 10px 10px
          background #fff
          border-box()
          box-sizing()
          radius(10px)
          padding 10px 20px
          color #6E6E6E
          h2, h3
            color #c84345
          h3
            font-size 1em
          h4 
            font-size 0.9em
          h2, h3, h4
            margin 15px




</style>
