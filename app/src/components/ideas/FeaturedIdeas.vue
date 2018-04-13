<template lang="pug">
.row-wrapper#featured-ideas(v-bind:class="{ 'no-content': (ideas.length === 0) }")
  .row
    .content-block
      .content-block--body
        #ideas
          router-link.content-block.content-block--tile.pull-left(v-for="(idea, index) in ideas" v-bind:to="`/idea/${idea._id}`" tag="div" v-bind:key="index" v-if="index < 3")
            idea-tile(v-bind:idea="idea")
          .clearfix
</template>

<script>
import API from '@/api'

import IdeaTile from '@/components/ideas/IdeaTile'

export default {
  name: 'featured-ideas',
  components: {
    IdeaTile
  },
  created () {
    API.idea.explore(
      undefined,
      (response) => {
        // Idea success
        this.$log(response)
        this.ideas = response.data
      },
      (error) => {
        // Idea fail
        this.$log(error)
      })
  },
  data () {
    return {
      ideas: []
    }
  }
}
</script>

<style lang="stylus" scoped>

@import '~stylus/home'

#featured-ideas
  &.no-content
    padding 0 !important
    .content-block
      background-color alpha(black, 0.2)
      height 1px
      margin-top -1px
    #ideas
      display none
    
  #ideas
    margin -10px -10px
    @media(max-width: $page-width)
      margin -10px -30px
    @media(max-width: 660px)
      margin -10px -10px
    .content-block--tile
      box-sizing border-box
      margin 10px
      padding 0
      width calc((100% / 3) - 20px)
      @media(max-width: 640px)
        width calc((100% / 2) - 20px)
      @media(max-width: 380px)
        width calc((100% / 1) - 20px)

</style>
