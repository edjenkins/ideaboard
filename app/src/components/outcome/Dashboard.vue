<template lang="pug">
  
#outcome-dashboard

  router-link.idea-tool(v-bind:to="{ name: 'outcomedocument', params: { id: idea._id } }" v-if="!instanceOutcome.ideaDocument.hide")
    .idea-tool--icon
      i.fas.fa-file-alt
    .idea-tool--title {{ instanceOutcome.ideaDocument.title}}
  router-link.idea-tool(v-bind:to="{ name: 'start', query: { idea: this.idea._id } }" v-if="!instanceOutcome.followIdea.hide")
    .idea-tool--icon
      i.fas.fa-lightbulb
    .idea-tool--title {{ instanceOutcome.followIdea.title}}
  .clearfix

</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'dashboard',
    props: ['activeTool', 'idea'],
    computed: {
      ...mapGetters(['instanceOutcome'])
    }
  }
</script>

<style lang="stylus" scoped>

@import '~stylus/shared'


// Tools
#outcome-dashboard
  padding 15px
  display flex
  flex-direction row
  flex-wrap wrap
  .idea-tool
    border-box()
    border $color-border 1px solid
    display block
    // float left
    flex 1
    flex-basis 200px
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
