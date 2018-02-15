<template lang="pug">
  
#outcome-dashboard

  .idea-tool.internal-tool(@click="loadTool('updates')")
    .idea-tool--title View All Updates
  .idea-tool.internal-tool(@click="loadTool('subscribers')")
    .idea-tool--title View Subscribers List
  .clearfix

  hr
  
  a.idea-tool.external-tool(href="http://doodle.com/" target="_blank")
    .idea-tool--title(v-bind:style="{ 'background-color': '#0A62D9' }") Visit Doodle Poll
    img.idea-tool--image(src="~images/logos/doodle-poll/horizontal-blue.png")
  a.idea-tool.external-tool(href="https://www.eventbrite.co.uk/" target="_blank")
    .idea-tool--title(v-bind:style="{ 'background-color': '#F6682F' }") Visit EventBrite
    img.idea-tool--image(src="~images/logos/eventbrite/horizontal-orange.png")
  a.idea-tool.external-tool(href="https://www.surveymonkey.com/" target="_blank")
    .idea-tool--title(v-bind:style="{ 'background-color': '#00BD70' }") Visit Survey Monkey
    img.idea-tool--image(src="~images/logos/survey-monkey/horizontal-green.svg")
  .clearfix

</template>

<script>
  export default {
    name: 'dashboard',
    props: ['activeTool', 'idea'],
    methods: {
      loadTool (tool) {
        this.$emit('update:activeTool', tool)
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
    background-color $color-darker-grey
    display block
    float left
    height 60px
    margin 10px
    overflow hidden
    position relative
    width calc(calc(100% / 3) - 20px)
    .idea-tool--title
      pinned()
      animate()
      position absolute
      color white
      line-height 60px
      text-align center
      z-index 2
      pointer-events none
    img.idea-tool--image
      center-align()
      max-width 80%
      max-height 25px
    &.external-tool
      background-color white
      height 100px
      .idea-tool--title
        line-height 100px
        opacity 0
      &:hover
        .idea-tool--title
          opacity 1
    &.internal-tool
      radius(0px)
      width calc(calc(100% / 2) - 20px)
      @media(max-width: 480px)
        width calc((100% / 1) - 20px)
      .idea-tool--title
        background-color white
        border $color-border 1px solid
        color $color-text-dark-grey
        
      &:hover
        cursor pointer
        .idea-tool--title
          background-color $color-lightest-grey

</style>
