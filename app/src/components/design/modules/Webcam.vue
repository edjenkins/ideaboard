<template lang="pug">
.design-task--webcam
  p.design-task--description(v-if="task.description") {{ task.description }}

  .webcam-wrapper(v-if="!response.location")
    video#video(ref="video" showcontrols="false" autoplay="true")
  
  .webcam-controls(v-if="!response.location")
    p {{ recorder ? recorder.state : 'unknown' }}
    .btn.btn-danger(v-if="isRecording" @click="stopRecording") Stop Recording
    .btn.btn-success(v-if="isReady" @click="startRecording") Start Recording
  
  .response-composer(v-if="response.location")
    .response-preview
      video#video-preview(ref="videopreview" controls="true" autoplay="true" loop="true" v-bind:src="response.location")
      textarea(v-bind:model="response.text" placeholder="Add a quote..")
      .clearfix

    //- pre {{ response }}
    
    .response-controls
      .btn.btn-danger.pull-left(@click="clearResponse") Delete
      //- .btn.btn-primary(@click="saveToDisk") Download
      .btn.btn-success.pull-right(@click="submitResponse") Submit video
      .clearfix

</template>

<script>
/* eslint-disable */
import Vue from 'vue'
import { mapGetters } from 'vuex'
import API from '@/api'

import _get from 'lodash/get'

import DesignTask from '@/mixins/DesignTask'

const RecordRTC = require('recordrtc')

export default {
  name: 'webcam',
  mixins: [DesignTask],
  computed: {
    ...mapGetters(['isAuthenticated'])
  },
  data () {
    return {
      recorder: undefined,
      camera: undefined,
      response: {
        location: '',
        text: ''
      }
    }
  },
  computed: {
    showControls () {
      const readyStates = ['stopped']
      return readyStates.indexOf(_get(this.recorder, 'state', 'unknown')) !== -1
    },
    isRecording () {
      return _get(this.recorder, 'state', 'unknown') === 'recording'
    },
    isReady () {
      const readyStates = ['inactive', 'stopped']
      return readyStates.indexOf(_get(this.recorder, 'state', 'unknown')) !== -1
    }
  },
  beforeDestroy () {
    this.$refs.video.stop()
  },
  mounted () {
    setTimeout(() => {
      this.captureCamera((camera) => {
        this.camera = camera
        setSrcObject(camera, this.$refs.video)
        this.$refs.video.play()
        this.recorder = RecordRTC(camera, {
          type: 'video'
        })
        this.recorder.camera = camera
      })
    }, 2000)
  },
  methods: {
    clearResponse () {
      this.response.text = undefined
      this.response.location = undefined
    },
    saveToDisk () {
      this.recorder.save()      
    },
    uploadVideo (video) {
      var formData = new FormData()
      formData.append('upload', video)

      API.upload.upload(formData,
        (response) => {
          this.response.location = response.data.upload.location
        },
        (error) => {
          this.$log(error)
        }
      )
    },
    stopRecordingCallback () {
      const video = this.recorder.getBlob()
      this.uploadVideo(video)
    },
    stopRecording () {
      this.recorder.stopRecording(this.stopRecordingCallback)
    },
    startRecording () {
      this.recorder.startRecording()
    },
    captureCamera (callback) {
      navigator.mediaDevices.getUserMedia({ audio: true, video: true }).then((camera) => {
        callback(camera)
      }).catch(function (error) {
        console.log('Unable to capture your camera. Please check console logs.')
        console.error(error)
      })
    }
  }
}
</script>

<style lang="stylus" scoped>

@import '~stylus/shared'

.design-task--webcam
  background-color white
  padding 25px
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
  .webcam-controls
    margin 0px -10px -20px -10px
    .btn
      display block
      margin 20px 10px
      max-width 100%
  .response-composer
    .response-preview
      background-color $color-lightest-grey
      padding-left 170px
      position relative
      video
        height 120px
        position absolute
        left 0
        top 0
        width 160px
      textarea
        border-box()
        background-color transparent
        border none
        font-size 1em
        min-height 120px
        outline 0
        padding 10px
        width 100%
    .response-controls
      .btn
        float left
        margin 20px 10px 0 0
      
</style>

