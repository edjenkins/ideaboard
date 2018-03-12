<template lang="pug">
  
#outcome-dashboard

  .idea-tool.internal-tool(@click="loadTool('updates')")
    .idea-tool--title Idea updates
  .idea-tool.internal-tool(@click="loadTool('subscribers')")
    .idea-tool--title Subscribers list
  .idea-tool.internal-tool(@click="loadTool('outcome-document')")
    .idea-tool--title Submit an outcome document
  .idea-tool.internal-tool(@click="startFollowOnIdea")
    .idea-tool--title Start a follow on Idea
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
    props: ['activeTool', 'idea'],
    methods: {
      loadTool (tool) {
        this.$emit('update:activeTool', tool)
      },
      startFollowOnIdea () {
        this.$router.push({ name: 'start', query: { idea: this.idea._id } })
      }
    }
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
    width calc(calc(100% / 3) - 20px)
    .idea-tool--title
      radius(10px)
      pinned()
      animate()
      color white
      line-height 30px
      padding 40px
      text-align center
      pointer-events none
    img.idea-tool--image
      center-align()
      max-width 80%
      max-height 25px
    &.external-tool
      height 100px
      .idea-tool--title
        line-height 100px
        opacity 0
      &:hover
        .idea-tool--title
          opacity 1
    &.internal-tool
      width calc(calc(100% / 2) - 20px)
      @media(max-width: 480px)
        width calc((100% / 1) - 20px)
      .idea-tool--title
        border $color-border 1px solid
        color $color-text-dark-grey
        
      &:hover
        cursor pointer

</style>
