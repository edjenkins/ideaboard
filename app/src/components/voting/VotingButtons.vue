<template lang="pug">
.voting-buttons
  .like(@click="like(response._id)" v-bind:class="{ 'has-voted': hasLiked }")
    i.fas.fa-angle-up.fa-2x
  .dislike(@click="dislike(response._id)" v-bind:class="{ 'has-voted': hasDisliked }")
    i.fas.fa-angle-down.fa-2x
</template>

<script>
import _ from 'lodash'
import { mapGetters } from 'vuex'

export default {
  name: 'voting-buttons',
  props: ['response'],
  computed: {
    ...mapGetters(['user']),
    hasLiked () {
      if (!this.user) return false
      return _.find(this.response._likes, (vote) => {
        console.log(vote._user._id)
        console.log(this.user._id)
        return (vote._user._id === this.user._id)
      })
    },
    hasDisliked () {
      if (!this.user) return false
      return _.find(this.response._dislikes, (vote) => {
        console.log(vote._user._id)
        console.log(this.user._id)
        return (vote._user._id === this.user._id)
      })
    }
  },
  methods: {
    like () {
      this.$emit('like')
    },
    dislike () {
      this.$emit('dislike')
    }
  }
}
</script>

<style lang="stylus" scoped>

@import '~stylus/shared'

.voting-buttons
  .like, .dislike
    pinned()
    animate()
    left 30px
    right 0
    color $color-text-light-grey
    position absolute
    height 40px
    line-height 40px
    text-align center
    &:hover
      cursor pointer
      color darken($color-text-light-grey, 20%)
    svg
      height 40px
      width 20px
    &.like
      bottom auto
      &.has-voted
        color $color-success
    &.dislike
      top auto
      &.has-voted
        color $color-danger

</style>
