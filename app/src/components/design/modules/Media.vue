<template lang="pug">
.design-task--media
  p.design-task--description(v-if="activeTask.description") {{ activeTask.description }}

  .media-wrapper
    // No media
    .no-media(v-if="responses.length === 0") No media posted

    // Media
    ul.media-items(v-if="responses.length !== 0")
      media-response(v-for="(response, index) in responses" v-bind:key="index" v-bind:idea="idea" v-bind:response="response")
      .clearfix

  // Submit a response
  .media-submission
    
    file-upload(v-bind:uploaded-file.sync="newResponse")

    .submit(v-if="newResponse")
      .response-composer
        .input-wrapper(@click="")
          input(v-bind:disabled="!isAuthenticated" type="text" v-model="newResponse.text" placeholder="Describe your upload.." v-on:keyup.enter="submitResponse")
          .btn.btn-primary(@click="submitResponse") Submit
        
</template>

<script>
import { mapGetters } from 'vuex'
import API from '@/api'
import FileUpload from '@/components/FileUpload'
import Avatar from '@/components/user/Avatar'
import MediaResponse from '@/components/design/components/MediaResponse'

export default {
  name: 'media',
  props: ['active-task', 'idea'],
  created () {
    this.fetchResponses()
  },
  components: {
    FileUpload,
    Avatar,
    MediaResponse
  },
  data () {
    return {
      newResponse: undefined,
      responses: []
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated'])
  },
  methods: {
    goBack () {
      this.$emit('back')
    },
    fetchResponses () {
      API.task.fetchResponses(
        'media',
        this.activeTask._id,
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
        this.activeTask._id,
        { response: this.newResponse },
        (response) => {
          this.$log(response)
          this.responses.push(response.data)
          this.newResponse = undefined
        },
        (error) => {
          this.$log(error)
          this.newResponse = undefined
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
