<template lang="pug">

.video-thumbnail
  video(id="video-player" class="video-js" controls preload="auto" data-setup='{}')
    source(v-bind:src="file.location" type="video/webm")
    //- source(src="example.mp4" type="video/mp4")
    //- source(src="example.ogv" type="video/ogg")
    
    p.vjs-no-js To view this video please enable JavaScript, and consider upgrading to a web browser that supports HTML5 video

</template>

<script>
const videojs = require('video.js')

export default {
  name: 'video-thumbnail',
  props: ['file'],
  mounted () {
    var options = {}
    videojs('video-player', options, function onPlayerReady () {
      videojs.log('Your player is ready!')
      this.on('ended', function () {
        videojs.log('Video ended!')
      })
    })
  }
}
</script>

<style lang="stylus" scoped>

@import '~stylus/shared'

.video-thumbnail
  reset()
  max-width 100%
  width 100%
  .video-js
    reset()
    height 0 !important
    padding-bottom 56.5%
    width 100% !important
</style>
