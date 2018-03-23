<template lang="pug">
.design-task--media
  p.design-task--description(v-if="task.description") {{ task.description }}

  .media-wrapper
    // No media
    .no-media(v-if="responses.length === 0" @click="fetchResponses") No media posted

    // Media
    ul.media-items(v-if="responses.length !== 0")
      media-response(v-for="(response, index) in responses" v-bind:key="index" v-bind:idea="idea" v-bind:response="response")
      .clearfix

  // Submit a response
  .media-submission
    
    file-upload(v-show="!webcamActive" v-bind:uploaded-file.sync="newResponse")

    webcam-capture(v-bind:captured-file.sync="newResponse" v-bind:is-active.sync="webcamActive")

    .submit(v-if="newResponse")
      .response-composer
        .input-wrapper(@click="")
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
          this.responses.push(response.data)
          this.newResponse = undefined
          this.webcamActive = false
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
      padding 28px 20px
      text-align center
    ul.media-items
      cleanlist()
      margin 0 -10px 20px -10px
  
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
</style>
