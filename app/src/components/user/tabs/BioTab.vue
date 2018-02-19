<template lang="pug">
.tab-content--bio
  h1.tab--header.no-parent(v-bind:class="{ editing: isEditing }" v-if="editedProfile && ownProfile")
    input(v-model="editedProfile.name" v-bind:readonly="!isEditing || !ownProfile")
    .tab--header--action(v-if="ownProfile")
      span#success(v-if="isEditing" @click="isEditing = false; updateProfile()") Save
      span(v-bind:class="{ editing: isEditing }" @click="toggleEditMode(); cancelUpdate()") {{ (isEditing) ? 'Cancel' : 'Edit' }}

  .tab--content(v-if="editedProfile")
    form.profile-form(v-bind:class="{ editing: isEditing }")
      .input-wrapper(v-if="isEditing")
        label Avatar
        
        file-upload(v-bind:uploaded-file="editedProfile.avatar" v-bind:uploaded-file.sync="editedAvatar")
      .input-wrapper(v-if="isEditing")
        label(v-if="isEditing") Bio
        textarea(v-model="editedProfile.bio" v-if="isEditing" rows="6")
      .input-wrapper
        p(v-if="!isEditing") {{ (editedProfile.bio) ? editedProfile.bio : 'No bio added yet' }}

    //- .profile--actions(v-if="!isEditing && ownProfile")
      .action(v-if="!editedProfile.avatar || !editedProfile.bio")
        .action--banner(@click="isEditing = true") Add an avatar or bio

</template>

<script>
import * as types from '@/store/mutation-types'
import API from '@/api'
import { mapGetters } from 'vuex'
import FileUpload from '@/components/FileUpload'

export default {
  name: 'bio-tab',
  props: ['currentUser'],
  components: {
    FileUpload
  },
  created () {
    this.editedProfile = JSON.parse(JSON.stringify(this.currentUser.profile))
  },
  watch: {
    'editedProfile': {
      handler: function (nV) {
        this.$emit('update:editedProfile', this.editedProfile)
      },
      deep: true
    },
    'editedAvatar': {
      handler: function (nV) {
        this.editedProfile.avatar = (nV) ? this.editedAvatar : this.editedProfile.avatar
      },
      deep: true
    }
  },
  data () {
    return {
      editedProfile: undefined,
      originalProfile: undefined,
      isEditing: false,
      editedAvatar: undefined
    }
  },
  computed: {
    ...mapGetters(['user']),
    ownProfile () {
      return this.user._id === this.currentUser._id
    }
  },
  methods: {
    cancelUpdate () {
      this.editedProfile = {
        name: this.user.profile.name,
        bio: this.user.profile.bio,
        avatar: this.user.profile.avatar
      }
    },
    updateProfile () {
      API.user.update(
        {
          profile: this.editedProfile
        },
        (response) => {
          this.$log(response.data)
          this.$store.commit(types.UPDATE_PROFILE, response.data.profile)
        },
        (error) => {
          this.$log(error)
        }
      )
    },
    toggleEditMode () {
      this.isEditing = !this.isEditing
    }
  }
}
</script>

<style lang="stylus" scoped>

@import '~stylus/shared'

.tab-content--bio
  text-align left
  
  h1.tab--header
    .tab--header--action
      span
        margin-left 15px
        &.editing
          color $color-danger
          &:hover
            color darken($color-danger, 10%)
        &#success
          color $color-success
          &:hover
            color darken($color-success, 10%)

  .tab--content
    padding 15px
    p
      reset()

    .action
      cleanlist()
      display inline-block
      margin 10px
      .action--banner
        animate()
        radius(20px)
        background-color $color-primary
        color white
        line-height 40px
        display inline-block
        padding 0 20px
        position relative
        &:hover
          cursor pointer
          background-color darken($color-primary, 5%)

    .profile-form
      .input-wrapper
        textarea
          box-sizing border-box
          border $color-border 1px solid
          font-size 1em
          margin 0
          outline 0
          padding 20px
          resize none
          width 100%
        p
          border-left $color-primary 3px solid
          padding 10px 20px
      &.editing
        .input-wrapper
          textarea
</style>
