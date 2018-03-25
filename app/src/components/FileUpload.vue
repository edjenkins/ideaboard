<template lang="pug">
.file-upload
  form(enctype="multipart/form-data" novalidate v-if="isInitial || isSaving")
    .dropbox
      input(type="file" multiple v-bind:name="uploadFieldName" v-bind:disabled="isSaving" @change="filesChange($event.target.name, $event.target.files); fileCount = $event.target.files.length" accept=".rtf,.doc,.docx,.pdf,image/*,video/*" class="input-file")
      p(v-if="isInitial")
        | Click to upload a file
      p(v-if="isSaving")
        | Uploading files...

  // SUCCESS
  .success-wrapper(v-if="isSuccess && uploadedFile")
    ul#upload-list
      li
        .image-preview(v-if="uploadedFile.mimetype.startsWith('image')")
          img(v-bind:src="uploadedFile.location")
        .unknown-preview(v-else)
          i.far.fa-file.fa-3x
          p {{ uploadedFile.originalname }}
        #reset-button(@click="reset()")
          i.fas.fa-trash-alt
      .clearfix

  // FAILED
  .failed-wrapper(v-if="isFailed")
    h2 Upload failed.
    .btn.btn-primary(@click="reset()") Try again

</template>

<script>
import API from '@/api'

const STATUS_INITIAL = 0
const STATUS_SAVING = 1
const STATUS_SUCCESS = 2
const STATUS_FAILED = 3

export default {
  name: 'file-upload',
  props: ['uploadedFile'],
  mounted () {
    this.reset()
  },
  data  () {
    return {
      uploadError: null,
      currentStatus: null,
      uploadFieldName: 'upload'
    }
  },
  watch: {
    uploadedFile (nV, oV) {
      if (typeof nV === 'undefined') {
        this.reset()
      }
    }
  },
  computed: {
    isInitial () {
      return this.currentStatus === STATUS_INITIAL
    },
    isSaving () {
      return this.currentStatus === STATUS_SAVING
    },
    isSuccess () {
      return this.currentStatus === STATUS_SUCCESS
    },
    isFailed () {
      return this.currentStatus === STATUS_FAILED
    }
  },
  methods: {
    reset () {
      // reset form to initial state
      this.currentStatus = STATUS_INITIAL
      this.uploadError = null
      this.$emit('update:uploadedFile', undefined)
    },
    save (formData) {
      // upload data to the server
      this.currentStatus = STATUS_SAVING

      API.upload.upload(formData,
        (response) => {
          this.$log(response)
          this.currentStatus = STATUS_SUCCESS
          this.$emit('update:uploadedFile', response.data.upload)
        },
        (error) => {
          this.$log(error)
          this.uploadError = error.response
          this.currentStatus = STATUS_FAILED
        }
      )
    },
    filesChange (fieldName, fileList) {
      // handle file changes
      const formData = new FormData()

      if (!fileList.length) return

      // append the files to FormData
      Array
        .from(Array(fileList.length).keys())
        .map(x => {
          formData.append(fieldName, fileList[x], fileList[x].name)
        })

      // save it
      this.save(formData)
    }
  }
}
</script>

<style lang="stylus" scoped>

@import '~stylus/shared'

.file-upload
  .dropbox
    animate()
    radius(20px)
    border $color-border 2px dashed
    background-color white
    box-sizing border-box
    color $color-text-grey
    padding 0 10px
    position relative
    cursor pointer
    p
      font-size 1.2em
      text-align center
      padding 0
    &:hover
      background-color $color-lightest-grey

  .btn
    margin-top 10px
    max-width 280px
    text-align center
    width auto

  .input-file
    opacity 0
    width 100%
    height 100px
    position absolute
    cursor pointer
  
  ul#upload-list
    cleanlist()
    margin-bottom 10px
    li
      cleanlist()
      position relative
      .image-preview
        img
          max-height 100px
          max-width 200px
      .unknown-preview
        background-color $color-lightest-grey
        display inline-block
        margin 0 10px 10px 0
        padding 20px
        text-align center
        p
          reset()
          color $color-border
          font-weight bold
        svg
          color $color-border

  #reset-button
    radius(50%)
    background-color $color-danger
    height 30px
    position absolute
    top -10px
    left -10px
    width 30px
    &:hover
      cursor pointer
      background-color darken($color-danger, 10%)
    svg
      color white
      height 16px
      margin 7px
      width 16px
</style>
