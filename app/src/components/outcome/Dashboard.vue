<template lang="pug">
  
#outcome-dashboard

  router-link.idea-tool(v-bind:to="{ name: 'outcomedocument', params: { id: idea._id } }")
    .idea-tool--icon
      i.fas.fa-file-alt
    .idea-tool--title Idea Document
  router-link.idea-tool(v-bind:to="{ name: 'start', query: { idea: this.idea._id } }")
    .idea-tool--icon
      i.fas.fa-lightbulb
    .idea-tool--title Start follow on Idea
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
    border-box()
    border $color-border 1px solid
    display block
    float left
    margin 10px
    overflow hidden
    padding 20px
    position relative
    text-align center
    text-decoration none
    width calc(calc(100% / 2) - 20px)
    @media(max-width: 480px)
      width calc((100% / 1) - 20px)
    .idea-tool--icon
      svg
        color $color-grey
        height 40px
        width 40px

    .idea-tool--title
      pinned()
      animate()
      background-color white
      color $color-text-dark-grey
      font-weight bold
      line-height 30px
      margin-top 10px
      pointer-events none
      &:hover
        cursor pointer

</style>
