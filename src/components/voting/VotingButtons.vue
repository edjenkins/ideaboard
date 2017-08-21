<template lang="pug">
.voting-buttons
  .like(@click="like(response._id)" v-bind:class="{ 'has-voted': hasLiked }")
    icon(name="angle-up" scale="2")
  .dislike(@click="dislike(response._id)" v-bind:class="{ 'has-voted': hasDisliked }")
    icon(name="angle-down" scale="2")
</template>

<script>
import _ from 'lodash'
import { mapGetters } from 'vuex'
import Icon from 'vue-awesome/components/Icon'
import 'vue-awesome/icons/angle-up'
import 'vue-awesome/icons/angle-down'

export default {
  name: 'voting-buttons',
  props: ['response'],
  components: {
    Icon
  },
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
    .fa-icon
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
