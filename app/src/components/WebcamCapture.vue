<template lang="pug">
.webcam-capture
  splash-messages(v-bind:messages="splashmessages")
  .webcam-output(v-show="captured")
    img(ref="photo")
  .webcam-wrapper(v-if="isActive && !localCapturedFile && (splashmessages.length === 0)")
    canvas(ref="canvas" v-show="!captured")
    video#video(ref="video" showcontrols="false" autoplay muted v-show="!captured")
  .clearfix

  .webcam-actions
    .btn(v-if="!localCapturedFile" v-bind:class="{ 'btn-danger': isActive, 'btn-primary full-width': !isActive }" @click="toggleCapture") {{ isActive ? 'Cancel' : 'Capture from webcam' }}
    .btn.btn-success(v-if="isActive && !localCapturedFile && (splashmessages.length === 0)" @click="capturing = true; capture()") {{ capturing ? 'Capturing...' : 'Capture' }} 
    .btn.btn-warning(v-if="localCapturedFile" @click="reset") Clear
    //- activate-btn
    .clearfix
</template>

<script>
/* eslint-disable */
import Vue from 'vuex'
import API from '@/api'
import { mapGetters } from 'vuex'
import MobileDetect from 'mobile-detect'

import SplashMessages from '@/components/shared/SplashMessages'

const RecordRTC = require('recordrtc')

export default {
  name: 'webcam-capture',
  props: ['capturedFile', 'isActive'],
  components: {
    SplashMessages
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
  mounted () {
    if (this.isMobile) {
      this.splashmessages = [{ text: 'Mobile device recording not yet supported!', type: 'error' }]
    }
  },
  data () {
    return {
      splashmessages: [],
      capturing: false,
      captured: false,
      localCapturedFile: false,
      bitrate: 200000,
      recorder: undefined,
      camera: undefined
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated']),
    isMobile () {
      const md = new MobileDetect(window.navigator.userAgent)
      return md.mobile()
    }
  },
  watch: {
    isActive (nV, oV) {
      if (nV) {
        this.loadCameraStream()
      }
    },
    capturedFile (nV, oV) {
      if (nV !== oV && typeof nV === 'undefined' && this.isActive) {
        this.reset()
      }
    }
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
      this.captured = false
      this.capturing = false
      this.loadCameraStream()
    },
    capture () {
      setTimeout(() => {        
        const canvas = this.$refs.canvas
        const context = canvas.getContext('2d')
        const height = this.$refs.video.clientHeight * 5
        const width = this.$refs.video.clientWidth * 5
        this.$refs.canvas.width = width
        this.$refs.canvas.height = height
        context.drawImage(video, 0, 0, width, height)
      
        const data = this.$refs.canvas.toDataURL('image/png')
        this.$refs.photo.setAttribute('src', data)
        this.$refs.canvas.toBlob((blob) => {
          this.uploadCapture(blob)
        }, 'image/jpeg', 0.95)
        this.capturing = false
        this.captured = true
      }, 50)
    },
    captureCamera (callback) {
      if (this.isMobile) return
      if (this.camera) callback(this.camera)

      navigator.mediaDevices.getUserMedia({ audio: true, video: true }).then((camera) => {
        callback(camera)
      }).catch(function (error) {
        console.log('Unable to capture your camera. Please check console logs.')
        console.error(error)
      })
    },
    loadCameraStream () {
      if (this.isMobile) return

      navigator.mediaDevices.getUserMedia({ audio: false, video: true }).then((camera) => {
        this.camera = camera
        this.$refs.video.srcObject = this.camera
        this.$refs.video.play()
        this.recorder = RecordRTC(camera, {
          type: 'video',
          mimeType: 'video/webm\;codecs=vp9',
          bitsPerSecond: this.bitrate
        })
        this.recorder.camera = camera
        this.splashmessages = []
      }).catch((error) => {
        this.splashmessages = [{ text: 'Could not access your camera, please check the connection', type: 'error' }]
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
  margin 0 auto
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
    canvas
      position absolute
      left -9999px
      z-index -9999
    video
      background-color $color-lightest-grey
      border none
      position absolute
      width 100%
      height 100%
      left 0
      top 0
  .webcam-actions
    margin 0 -10px 20px -10px
    .btn
      float left
      margin 20px 10px 0 10px
      width calc(50% - 20px)
    .btn.full-width
      width calc(100% - 20px)
</style>
