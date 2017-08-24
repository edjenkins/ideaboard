<template lang="pug">
  #explore
    page-header(title="Explore Ideas" subtitle="Find something that interests you and begin an engaging design process with friends.")
    idea-filter(v-bind:sort-type.sync="sortType" v-bind:search-query.sync="searchQuery")
    .row#explore-row
      router-link.content-block.content-block--tile.pull-left(v-for="(idea, index) in orderedIdeas" v-bind:to="`/idea/${idea._id}`" tag="div" v-bind:key="index")
        idea-tile(v-bind:idea="idea")
      .clearfix
</template>

<script>
import _ from 'lodash'
import API from '@/api'

import PageHeader from '@/components/PageHeader'
import IdeaFilter from '@/components/navigation/IdeaFilter'
import IdeaTile from '@/components/ideas/IdeaTile'

export default {
  name: 'explore',
  metaInfo: {
    title: 'Explore'
  },
  components: {
    PageHeader,
    IdeaFilter,
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
      sortType: 'recent',
      searchQuery: '',
      ideas: []
    }
  },
  computed: {
    orderedIdeas () {
      let ideas = _.sortBy(this.ideas, (idea) => {
        switch (this.sortType) {
          case 'recent':
            return idea.created
          case 'popular':
            return idea._subscribers.length
          case 'default':
            return idea.created
        }
      }).reverse()

      return (this.searchQuery.length < 2) ? ideas : ideas.filter((idea) => { return idea.title.toLowerCase().indexOf(this.searchQuery.toLowerCase()) > -1 })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~stylus/shared'

#explore
  text-align center
  h1, h2
    reset()
    color $color-text-grey
    font-weight normal 
  .row#explore-row
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
