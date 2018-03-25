<template lang="pug">
.webcam-capture
  .webcam-output(v-show="localCapturedFile")
    img(ref="photo")
  .webcam-wrapper(v-if="isActive && !localCapturedFile")
    canvas(ref="canvas")
    video#video(ref="video" showcontrols="false" autoplay="true" muted="muted")  
  .clearfix

  .btn.btn-warning(v-if="localCapturedFile" @click="reset") Clear
  .btn.btn-success(v-if="isActive && !localCapturedFile" @click="capture") Capture
  div(v-if="!localCapturedFile" @click="toggleCapture")
    .btn.btn-danger(v-if="isActive") Cancel
    .activate-btn(v-if="!isActive")
      p Capture from webcam
</template>

<script>
/* eslint-disable */
import API from '@/api'
import { mapGetters } from 'vuex'

const RecordRTC = require('recordrtc')

export default {
  name: 'webcam-capture',
  props: ['capturedFile', 'isActive'],
  data () {
    return {
      localCapturedFile: false,
      bitrate: 200000,
      recorder: undefined,
      camera: undefined
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated'])
  },
  watch: {
    capturedFile (nV, oV) {
      if (nV !== oV && typeof nV === 'undefined') {
        this.reset()
      }
    }
  },
  beforeRouteLeave (to, from, next) {
    if (this.recorder) this.recorder.stopRecording()
    if (this.camera) this.camera.stop()
    next()
  },
  beforeDestroy () {
    if (this.recorder) this.recorder.stopRecording()
    if (this.camera) this.camera.stop()
  },
  methods: {
    uploadCapture (blob) {
      var formData = new FormData()
      formData.append('upload', blob)

      API.upload.upload(formData,
        (response) => {
          this.$emit('update:capturedFile', response.data.upload)
          this.localCapturedFile = response.data.upload
        },
        (error) => {
          this.$log(error)
        }
      )
    },
    toggleCapture () {
      if (!this.isActive) {
        this.loadCameraStream()
      } else {
        if (this.recorder) this.recorder.stopRecording()
        if (this.camera) this.camera.stop()
      }
      this.$emit('update:isActive', !this.isActive)
      
    },
    reset () {
      this.$emit('update:capturedFile', undefined)
      this.localCapturedFile = undefined
      this.loadCameraStream()
    },
    capture () {
      var canvas = this.$refs.canvas
      var context = canvas.getContext('2d')
      const height = this.$refs.video.clientHeight * 4
      const width = this.$refs.video.clientWidth * 4
      this.$refs.canvas.width = width
      this.$refs.canvas.height = height
      context.drawImage(video, 0, 0, width, height)
    
      var data = this.$refs.canvas.toDataURL('image/png')
      this.$refs.canvas.toBlob((blob) => {
        this.uploadCapture(blob)
      }, 'image/jpeg', 0.95)
      this.$refs.photo.setAttribute('src', data)

    },
    captureCamera (callback) {
      if (this.camera) callback(this.camera)
      navigator.mediaDevices.getUserMedia({ audio: true, video: true }).then((camera) => {
        callback(camera)
      }).catch(function (error) {
        console.log('Unable to capture your camera. Please check console logs.')
        console.error(error)
      })
    },
    loadCameraStream () {
      navigator.mediaDevices.getUserMedia({ audio: true, video: true }).then((camera) => {
        this.camera = camera
        setSrcObject(camera, this.$refs.video)
        this.$refs.video.play()
        this.recorder = RecordRTC(camera, {
          type: 'video',
          mimeType: 'video/webm\;codecs=vp9',
          bitsPerSecond: this.bitrate
        })
        this.recorder.camera = camera
      }).catch(function (error) {
        console.log('Camera unavailable!')
        console.error(error)
      })
    }
  }
}
</script>

<style lang="stylus" scoped>

@import '~stylus/shared'

.webcam-capture
  margin 20px auto 30px auto
  .btn
    display block
    margin 20px 0
    max-width 100%
  .webcam-output
    img
      max-height 400px
      max-width 100%
  .webcam-wrapper
    position relative
    width 100%
    height 0
    padding-bottom 75%
    video
      border none
      position absolute
      width 100%
      height 100%
      left 0
      top 0
  .activate-btn
    animate()
    radius(20px)
    border $color-border 2px dashed
    background-color white
    box-sizing border-box
    color $color-text-grey
    padding 20px 10px
    position relative
    cursor pointer
    p
      reset()
      font-size 1.2em
      text-align center
    &:hover
      background-color $color-lightest-grey
</style>
