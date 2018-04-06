<template lang="pug">
.design-task--media
  p.design-task--description(v-if="task.description") {{ task.description }}

  splash-messages(v-if="!isAuthenticated" v-bind:messages="[{type:'success',text:'Please login to participate!'}]")

  .media-wrapper
    // No media
    //- .no-media(v-if="responses.length === 0" @click="fetchResponses") Be the first to share

    // Media
    ul.media-items(v-if="responses.length !== 0")
      media-response(v-for="(response, index) in responses" v-bind:key="index" v-bind:idea="idea" v-bind:response="response")
      .clearfix

  // Submit a response
  .media-submission(v-if="isAuthenticated")
    
    file-upload(v-show="!webcamActive" v-bind:uploaded-file.sync="newResponse")
    .btn-webcam(v-show="!webcamActive && !newResponse" @click="toggleWebcam")
      p
        i.fas.fa-camera
    .clearfix
    webcam-capture(v-show="webcamActive && !newResponse" v-bind:captured-file.sync="newResponse" v-bind:is-active.sync="webcamActive")

    .submit(v-if="newResponse")
      .response-composer
        .input-wrapper
          input(v-bind:disabled="!isAuthenticated" type="text" v-model="newResponse.text" placeholder="Describe your upload.." v-on:keyup.enter="submitResponse")
          .btn.btn-primary(@click="submitResponse") Submit
        
</template>

<script>
import { mapGetters } from 'vuex'
import API from '@/api'

import DesignTask from '@/mixins/DesignTask'

import FileUpload from '@/components/FileUpload'
import WebcamCapture from '@/components/WebcamCapture'

import Avatar from '@/components/user/Avatar'
import MediaResponse from '@/components/design/components/MediaResponse'

export default {
  name: 'media',
  mixins: [DesignTask],
  created () {
    this.fetchResponses()
  },
  components: {
    FileUpload,
    WebcamCapture,
    Avatar,
    MediaResponse
  },
  data () {
    return {
      newResponse: undefined,
      responses: [],
      webcamActive: false
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated'])
  },
  methods: {
    toggleWebcam () {
      this.webcamActive = !this.webcamActive
    },
    fetchResponses () {
      API.task.fetchResponses(
        'media',
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
      if (!this.isAuthenticated) return
      API.task.submitResponse(
        'media',
        this.$route.params.task_id,
        { response: this.newResponse },
        (response) => {
          this.$log(response)
          // this.responses.push(response.data)
          this.newResponse = undefined
          this.webcamActive = false
          this.fetchResponses()
        },
        (error) => {
          this.$log(error)
          this.newResponse = undefined
          this.webcamActive = false
        }
      )
    }
  }
}
</script>

<style lang="stylus" scoped>

@import '~stylus/shared'

.design-task--media
  background-color white
  padding 25px
  .media-wrapper
    .no-media
      color $color-text-grey
      margin 0 0 20px 0
      padding 60px 20px
      text-align center
    ul.media-items
      cleanlist()
      margin 0 -10px 20px -10px
  
  // .media-submission
  //   max-width 600px

  .response-composer
    animate()
    margin-top 0
    opacity 1
    position relative
    .btn
      position absolute
      right 0
      bottom 0
      line-height 40px
      padding 0
      width 80px
    .input-wrapper
      border $color-border 1px solid
      input
        border none
        box-sizing border-box
        line-height 30px
        outline 0
        padding 5px 10px
        padding-right 80px
        width calc(100% - 80px)

  .file-upload
    float left
    width calc(100% - 90px)
  .btn-webcam
    animate()
    radius(20px)
    border $color-border 2px dashed
    background-color white
    box-sizing border-box
    color $color-text-grey
    cursor pointer
    float left
    margin-left 20px
    padding 20px 0
    position relative
    width 70px
    p
      reset()
      font-size 1.2em
      text-align center
    &:hover
      background-color $color-lightest-grey
</style>
