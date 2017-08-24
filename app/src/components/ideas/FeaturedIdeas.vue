<template lang="pug">
  #featured-ideas
    router-link.content-block.content-block--tile.pull-left(v-for="(idea, index) in orderedIdeas" v-bind:to="`/idea/${idea._id}`" tag="div" v-bind:key="index")
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
@import '~stylus/shared'

#featured-ideas
  padding 10px
  max-width $page-width + 20px
  .content-block--tile
    box-sizing border-box
    margin 10px
    padding 0
    width calc((100% / 4) - 20px)
    @media(max-width: 860px)
      width calc((100% / 3) - 20px)
    @media(max-width: 640px)
      width calc((100% / 2) - 20px)
    @media(max-width: 380px)
      width calc((100% / 1) - 20px)

</style>
