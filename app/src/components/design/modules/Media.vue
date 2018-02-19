<template lang="pug">
.design-task--media
  p.design-task--description(v-if="activeTask.description") {{ activeTask.description }}

  .media-wrapper
    // No media
    .no-media(v-if="responses.length === 0") No media posted

    // Media
    ul.media-items(v-if="responses.length !== 0")
      li.media-item(v-for="(response, index) in responses" v-bind:key="index")
        //- pre {{ response }}
        a(v-bind:href="response.response" target="_blank")
          .thumbnail(v-bind:style="{ 'background-image': `url('${response.response}')` }")
      .clearfix

  .media-submission
    file-upload(v-bind:uploaded-file.sync="newResponse")
    .submit(v-if="newResponse")
      br
      .btn.btn-primary(@click="submitResponse") Post Media
  
</template>

<script>
import { mapGetters } from 'vuex'
import API from '@/api'
import FileUpload from '@/components/FileUpload'

export default {
  name: 'media',
  props: ['active-task'],
  created () {
    this.fetchResponses()
  },
  components: {
    FileUpload
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
      alert('submitResponse')
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
      li.media-item
        cleanlist()
        float left
        margin 10px
        .thumbnail
          background-image()
          height 100px
          width 140px
</style>
