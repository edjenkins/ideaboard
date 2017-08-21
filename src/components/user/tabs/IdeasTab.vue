<template lang="pug">
.tab-content--ideas(v-if="ideas.length")
  h1.tab--header.no-parent
    | Started Ideas

  .tab--content
    .ideas-wrapper
      router-link.content-block.content-block--tile.pull-left(tag="div" v-for="(idea, index) in ideas" v-bind:key="index" v-bind:to="`/idea/${idea._id}`")
        idea-tile.bordered(v-bind:idea="idea")
      .clearfix
</template>

<script>
import API from '@/api'
import { mapGetters } from 'vuex'

import IdeaTile from '@/components/ideas/IdeaTile'

export default {
  name: 'ideas-tab',
  props: ['currentUser'],
  components: {
    IdeaTile
  },
  mounted () {
    console.log(this.currentUser)
    API.user.ideas(
      this.currentUser._id,
      (response) => {
        // Idea success
        this.$log(response)
        this.ideas = response.data
      },
      (error) => {
        // Idea fail
        this.$log(error)
        this.ideas = []
      })
  },
  data () {
    return {
      ideas: []
    }
  },
  computed: {
    ...mapGetters(['user'])
  }
}
</script>

<style lang="stylus" scoped>

@import '~stylus/shared'

.tab-content--ideas
  text-align left
  .tab--content
    padding 25px  
    p
      reset()
    .ideas-wrapper
      margin -10px
      .content-block--tile
        box-sizing border-box
        margin 10px
        padding 0
        width calc((100% / 3) - 20px)
        @media(max-width: 860px)
          width calc((100% / 2) - 20px)
        @media(max-width: 480px)
          width calc((100% / 1) - 20px)
        .bordered
          border $color-border 1px solid

</style>
