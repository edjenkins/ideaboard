<template lang="pug">
.design-task--webcam
  p.design-task--description(v-if="task.description") {{ task.description }}

  .webcam-wrapper(v-if="!newResponse.location")
    video#video(ref="video" showcontrols="false" autoplay="true")
  
  .webcam-controls(v-if="!newResponse.location")
    //- p {{ recorder ? recorder.state : 'unknown' }}
    .btn.btn-danger(v-if="isRecording" @click="stopRecording") Stop Recording
    .btn.btn-success(v-if="isReady" @click="startRecording") Start Recording
  
  .response-composer(v-if="newResponse.location")
    .response-preview
      video#video-preview(ref="videopreview" controls="true" autoplay="true" loop="true" v-bind:src="newResponse.location")
      textarea(v-bind:model="newResponse.text" placeholder="Add a quote..")
      .clearfix

    .response-controls
      .btn.btn-danger.pull-left(@click="clearResponse") Delete
      //- .btn.btn-primary(@click="saveToDisk") Download
      .btn.btn-success.pull-right(@click="submitResponse") Submit video
      .clearfix
  
  .responses
    ul
      li(v-for="(response, index) in responses" v-bind:key="index")
        h5 {{ response._user.profile.name }}
        h5 {{ response.response.text }}
        video(controls="true" autoplay="false" loop="false" v-bind:src="response.response.location")

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
      responses: [],
      newResponse: {
        location: undefined,
        text: undefined
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
  beforeRouteLeave (to, from, next) {
    if (this.recorder) this.recorder.stopRecording()
    if (this.camera) this.camera.stop()
    next()
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
          type: 'video'
        })
        this.recorder.camera = camera
      }).catch(function (error) {
        alert('Camera unavailable!')
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
  ul, li
    cleanlist()
    video
      max-width 50%
</style>

