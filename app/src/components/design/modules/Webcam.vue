<template lang="pug">
.design-task--webcam
  p.design-task--description(v-if="task.description") {{ task.description }}

  splash-messages(v-if="!isAuthenticated" v-bind:messages="[{type:'success',text:'Please login to participate!'}]")

  .response-composer
    .webcam-wrapper(v-if="isAuthenticated && !newResponse.location")
      video#video(ref="video" showcontrols="false" autoplay="true" muted="muted")
    
    .webcam-controls(v-if="isAuthenticated && !newResponse.location")
      //- p {{ recorder ? recorder.state : 'unknown' }}
      .btn.btn-danger(v-if="isRecording" @click="stopRecording") Stop Recording
      .btn.btn-success(v-if="isReady" @click="startRecording") Start Recording
    
    div(v-show="isAuthenticated && newResponse.location")
      .response-preview
        video#video-preview(ref="videopreview" controls="true" autoplay="true" loop="true" v-bind:src="newResponse.location")
        textarea(v-model="newResponseText" placeholder="Add a quote..")
        .clearfix

      .response-controls
        .btn.btn-danger.pull-left(@click="clearResponse") Delete
        //- .btn.btn-primary(@click="saveToDisk") Download
        .btn.btn-success.pull-right(@click="submitResponse") Submit video
        .clearfix
  
  .responses
    ul
      li(v-for="(response, index) in responses" v-bind:key="index")
        .response-preview
          video(controls="true" v-bind:src="response.response.location")
          .response-meta
            h5 Caption: {{ response.response.text }}
            p Uploaded by {{ response._user.profile.name }}

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
  data () {
    return {
      bitrate: 200000,
      newResponseText: '',
      recorder: undefined,
      camera: undefined,
      responses: [],
      newResponse: {
        location: undefined,
        text: undefined
      }
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated']),
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
    setTimeout(() => {
      this.loadCameraStream()
    }, 2000)
    this.fetchResponses()
  },
  methods: {
    fetchResponses () {
      API.task.fetchResponses(
        'webcam',
        this.$route.params.task_id,
        (response) => {
          this.$log(response)
          this.responses = response.data
        },
        (error) => {
          this.$log(error)
        }
      )
    },
    submitResponse () {
      this.newResponse.text = this.newResponseText
      API.task.submitResponse(
        'webcam',
        this.$route.params.task_id,
        { response: this.newResponse },
        (response) => {
          this.$log(response)
          this.responses.push(response.data)
          this.newResponse.text = undefined
          this.newResponse.location = undefined
          this.fetchResponses()
        },
        (error) => {
          this.$log(error)
        }
      )
    },
    clearResponse () {
      this.newResponse.text = undefined
      this.newResponse.location = undefined
      
      this.loadCameraStream()
    },
    saveToDisk () {
      this.recorder.save()      
    },
    uploadVideo (video) {
      var formData = new FormData()
      formData.append('upload', video)

      API.upload.upload(formData,
        (response) => {
          this.newResponse.location = response.data.upload.location
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
      this.camera.stop()
      this.recorder.stopRecording(this.stopRecordingCallback)
    },
    startRecording () {
      this.recorder.startRecording()
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

.design-task--webcam
  background-color white
  padding 25px
  .response-composer
    position relative  
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
  .response-preview
    background-color $color-lightest-grey
    padding-left 210px
    position relative
    video
      height 160px
      position absolute
      left 0
      top 0
      width 200px
    textarea
      border-box()
      background-color transparent
      border none
      font-size 1em
      min-height 160px
      outline 0
      padding 10px
      width 100%
  .response-controls
    .btn
      float left
      margin 20px 10px 0 0

.responses
  ul
    cleanlist()
    li
      cleanlist()
      padding-top 20px
      .response-preview
        background-color $color-lighter-grey
        padding-left 210px
        position relative
        .response-meta
          border-box()
          background-color transparent
          border none
          font-size 1em
          min-height 160px
          outline 0
          padding 10px
          width 100%
          h5
            reset()
            color $color-text-darkest-grey
            font-size 1.1em
            margin-top 10px
          p
            reset()
            color $color-text-grey
            font-size 1em
            margin-top 10px
        video
          height 160px
          position absolute
          left 0
          top 0
          width 200px
</style>

