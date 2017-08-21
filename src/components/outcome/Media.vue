<template lang="pug">
  #medias
    #loading(v-if="loading") Loading...
    ul.media-list
      li.media(v-for="(media, index) in medias")
        p.media--name {{ media._user.profile.name }}
        p.media--date {{ getDate(media.subscribedAt) }}
        .clearfix
      .clearfix
</template>

<script>
import Moment from 'moment'

export default {
  name: 'media',
  props: ['idea'],
  data () {
    return {
      loading: true,
      medias: []
    }
  },
  created () {
    this.getMedia()
  },
  methods: {
    getMedia () {
      this.loading = true
      setTimeout(() => {
        this.loading = false
        this.medias = this.idea._medias
      }, 1500)
    },
    getDate (date) {
      return Moment(date).format('MMM Do YYYY')
    }
  }
}
</script>

<style lang="stylus" scoped>

@import '~stylus/shared'

#medias
  min-height 220px
  #loading
    color color-text-light-grey
    line-height 200px
    text-align center
  ul.media-list
    cleanlist()
    li.media
      cleanlist()
      border-top $color-border 1px solid
      line-height 60px
      margin 0 0 0 20px
      padding 0 20px 0 10px
      &:first-child
        border-top none
      p.media--name
        reset()
        float left
      p.media--date
        reset()
        color $color-text-light-grey
        float right
</style>
