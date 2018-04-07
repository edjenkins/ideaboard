<template lang="pug">

.video-thumbnail
  video(v-bind:id="`${file._id}-video-player`" class="video-js" controls preload="auto")
    source(v-bind:src="getLocation(file.location, 'webm')" type="video/webm")
    source(v-bind:src="getLocation(file.location, 'mp4')" type="video/mp4")
    source(v-bind:src="getLocation(file.location, 'fmp4')" type="video/fmp4")
    
    p.vjs-no-js To view this video please enable JavaScript, and consider upgrading to a web browser that supports HTML5 video
  
  //- img(v-bind:src="getThumbnail(file.location)")

</template>

<script>
import VideoMixin from '@/mixins/VideoMixin'

export default {
  name: 'video-thumbnail',
  props: ['file'],
  mixins: [
    VideoMixin
  ]
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
