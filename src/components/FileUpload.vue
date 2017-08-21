<template lang="pug">
.file-upload
  form(enctype="multipart/form-data" novalidate v-if="isInitial || isSaving")
    .dropbox
      input(type="file" multiple v-bind:name="uploadFieldName" v-bind:disabled="isSaving" @change="filesChange($event.target.name, $event.target.files); fileCount = $event.target.files.length" accept="image/*" class="input-file")
      p(v-if="isInitial")
        | Drop files here or click to browse
      p(v-if="isSaving")
        | Uploading files...
  

  // SUCCESS
  div(v-if="isSuccess")
    ul#upload-list
      li
        img(v-bind:src="uploadedFile.location")
    .btn.btn-primary(@click="reset()") Upload a different file

  // FAILED
  div(v-if="isFailed")
    h2 Upload failed.
    .btn.btn-primary(@click="reset()") Try again
    //- pre {{ uploadError }}

</template>

<script>
import API from '@/api'

const STATUS_INITIAL = 0
const STATUS_SAVING = 1
const STATUS_SUCCESS = 2
const STATUS_FAILED = 3

export default {
  name: 'file-upload',
  mounted () {
    this.reset()
  },
  data  () {
    return {
      uploadedFile: undefined,
      uploadError: null,
      currentStatus: null,
      uploadFieldName: 'upload'
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
      this.uploadedFile = undefined
      this.uploadError = null
      this.$emit('update:uploadedFile', undefined)
    },
    save (formData) {
      // upload data to the server
      this.currentStatus = STATUS_SAVING

      API.upload.upload(formData,
        (response) => {
          this.$log(response)
          this.uploadedFile = response.data.upload
          this.currentStatus = STATUS_SUCCESS
          this.$emit('update:uploadedFile', this.uploadedFile.location)
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
    padding 10px 10px
    position relative
    cursor pointer
    p
      font-size 1.2em
      text-align center
      padding 30px 0
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
    li
      cleanlist()
      img
        max-height 100px
        max-width 200px
</style>
