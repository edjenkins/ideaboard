<template lang="pug">

.video-thumbnail
  //- video(controls)
  video(v-bind:id="`${file._id}-video-player`" class="video-js" controls preload="auto")
    source(v-bind:src="getLocation(file.location, 'webm')" type="video/webm")
    source(v-bind:src="getLocation(file.location, 'mp4')" type="video/mp4")
    source(v-bind:src="getLocation(file.location, 'fmp4')" type="video/fmp4")
    //- source(v-bind:src="getLocation(file.location, 'ogv')" type="video/ogg")
    
    p.vjs-no-js To view this video please enable JavaScript, and consider upgrading to a web browser that supports HTML5 video
  
  //- img(v-bind:src="getThumbnail(file.location)")

</template>

<script>
const videojs = require('video.js')

export default {
  name: 'video-thumbnail',
  props: ['file'],
  mounted () {
    videojs(`${this.file._id}-video-player`, {}, function onPlayerReady () {})
  },
  methods: {
    getLocation (location, type) {
      location = location.replace('https://ideaboard.s3.eu-west-2.amazonaws.com/uploads/', 'https://s3.eu-west-2.amazonaws.com/ideaboard/encoded/')
      location = `${location.substr(0, location.lastIndexOf('.'))}.${type}`
      return location
    },
    getThumbnail (location) {
      location = location.replace('https://ideaboard.s3.eu-west-2.amazonaws.com/uploads/', 'https://s3.eu-west-2.amazonaws.com/ideaboard/encoded/')
      location = `${location.substr(0, location.lastIndexOf('.'))}-00001.png`
      return location
    }
  }
}
</script>

<style lang="stylus" scoped>

@import '~stylus/shared'

.video-thumbnail
  reset()
  max-width 100%
  width 100%
  video
    width 100%
  .video-js
    reset()
    height 0 !important
    padding-bottom 56.5%
    width 100% !important
</style>
