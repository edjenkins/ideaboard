<template lang="pug">
.user-card
  router-link.avatar-wrapper(tag="div" v-bind:to="profileLink")
    avatar(v-bind:profile="profile")
  h1.user--name {{ profile.name }}
  h5.user--joined {{ joined }}
</template>

<script>
// import Moment from 'moment'

import Avatar from '@/components/user/Avatar'

export default {
  name: 'user-card',
  props: ['profile', 'id'],
  components: {
    Avatar
  },
  computed: {
    joined () {
      return 'Standard Account'
    },
    profileLink () {
      if (!this.id) return '/'
      return `/profile/${this.id}`
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~stylus/shared'

.user-card
  .avatar-wrapper
    margin 0 auto
    padding 10px 40px 20px 40px
    max-width 120px
    &:hover
      cursor pointer
  h1.user--name
    reset()
    color $color-text-grey
    font-size 1.3em
    font-weight normal
  h5.user--joined
    reset()
    color $color-text-light-grey
    font-size 0.9em
    font-weight normal
</style>
