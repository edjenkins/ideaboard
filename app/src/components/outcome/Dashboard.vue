<template lang="pug">
  
#outcome-dashboard

  router-link.idea-tool(v-bind:to="{ name: 'outcomedocument', params: { id: idea._id } }")
    .idea-tool--title Document Idea
  router-link.idea-tool(v-bind:to="{ name: 'start', query: { idea: this.idea._id } }")
    .idea-tool--title Start follow on Idea
  //- router-link.idea-tool.internal-tool(v-bind:to="{ name: 'outcomeupdates', params: { id: idea._id } }")
  //-   .idea-tool--title Creator updates
  //- router-link.idea-tool.internal-tool(v-bind:to="{ name: 'outcomesubscribers', params: { id: idea._id } }")
  //-   .idea-tool--title Subscribers list
  .clearfix

  //- hr
  
  //- a.idea-tool.external-tool(href="http://doodle.com/" target="_blank")
  //-   .idea-tool--title(v-bind:style="{ 'background-color': '#0A62D9' }") Visit Doodle Poll
  //-   img.idea-tool--image(src="~images/logos/doodle-poll/horizontal-blue.png")
  //- a.idea-tool.external-tool(href="https://www.eventbrite.co.uk/" target="_blank")
  //-   .idea-tool--title(v-bind:style="{ 'background-color': '#F6682F' }") Visit EventBrite
  //-   img.idea-tool--image(src="~images/logos/eventbrite/horizontal-orange.png")
  //- a.idea-tool.external-tool(href="https://www.surveymonkey.com/" target="_blank")
  //-   .idea-tool--title(v-bind:style="{ 'background-color': '#00BD70' }") Visit Survey Monkey
  //-   img.idea-tool--image(src="~images/logos/survey-monkey/horizontal-green.svg")
  .clearfix

</template>

<script>
  export default {
    name: 'dashboard',
    props: ['activeTool', 'idea']
  }
</script>

<style lang="stylus" scoped>

@import '~stylus/shared'

// Tools
#outcome-dashboard
  padding 15px
  .idea-tool
    display block
    float left
    margin 10px
    overflow hidden
    position relative
    text-decoration none
    width calc(calc(100% / 2) - 20px)
    @media(max-width: 480px)
      width calc((100% / 1) - 20px)
    .idea-tool--title
      radius(10px)
      pinned()
      animate()
      background-color white
      border $color-border 1px solid
      color $color-text-dark-grey
      font-weight bold
      line-height 30px
      padding 40px 20px
      text-align center
      pointer-events none
      &:hover
        cursor pointer
    img.idea-tool--image
      center-align()
      max-width 80%
      max-height 25px
    &.internal-tool
      .idea-tool--title
        padding 15px 20px

</style>
