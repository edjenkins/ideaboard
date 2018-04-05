<template lang="pug">
.tab-content--bio
  h1.tab--header.no-parent(v-bind:class="{ editing: isEditing }" v-if="editedProfile && ownProfile")
    input(v-model="editedProfile.name" placeholder="Your name" v-bind:readonly="!isEditing || !ownProfile")
    .tab--header--action(v-if="ownProfile")
      span#success(v-if="isEditing" @click="updateProfile()") Done
      span(v-if="!isEditing" @click="toggleEditMode()") Edit

  .tab--content(v-if="editedProfile")
    form.profile-form(v-bind:class="{ editing: isEditing }")
      .input-wrapper(v-if="isEditing")
        label(v-if="isEditing") Bio
        textarea(v-model="editedProfile.bio" v-if="isEditing" rows="6")
      .input-wrapper(v-if="isEditing")
        label Avatar
        file-upload(v-bind:uploaded-file="editedProfile.avatar" v-bind:uploaded-file.sync="editedAvatar")
      .input-wrapper(v-if="!isEditing && !(ownProfile && !editedProfile.bio)")
        p {{ (editedProfile.bio) ? editedProfile.bio : 'No bio added yet' }}

    .profile--actions(v-if="!isEditing && ownProfile")
      .action(v-if="!editedProfile.avatar || !editedProfile.bio")
        .action--banner(@click="isEditing = true") Add an avatar or bio

    .ideas-wrapper
      router-link.content-block.content-block--tile.pull-left(tag="div" v-for="(idea, index) in ideas" v-bind:key="index" v-bind:to="{ name: 'idea', params: { id: idea._id } }")
        idea-tile.bordered(v-bind:idea="idea")
      .clearfix

</template>

<script>
import * as types from '@/store/mutation-types'
import API from '@/api'
import { mapGetters } from 'vuex'
import FileUpload from '@/components/FileUpload'
import IdeaTile from '@/components/ideas/IdeaTile'

export default {
  name: 'bio-tab',
  props: ['currentUser', 'ownProfile'],
  components: {
    FileUpload,
    IdeaTile
  },
  created () {
    this.editedProfile = JSON.parse(JSON.stringify(this.currentUser.profile))
    setTimeout(() => {
      this.fetchIdeas()
    }, 500)
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
      editedAvatar: undefined,
      ideas: []
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
    fetchIdeas () {
      API.user.ideas(
        this.currentUser._id,
        (response) => {
          // Idea success
          this.$log(response)
          this.ideas = response.data
        },
        (error) => {
          // Idea fail
          this.$log(error)
          this.ideas = []
        })
    },
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
          this.toggleEditMode()
          this.editedProfile = response.data.profile
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
    padding-right 80px
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
    
    .ideas-wrapper
      .content-block--tile
        box-sizing border-box
        margin 10px
        padding 0
        width calc((100% / 3) - 20px)
        @media(max-width: 860px)
          width calc((100% / 2) - 20px)
        @media(max-width: 480px)
          width calc((100% / 1) - 20px)
        .bordered
          border $color-border 1px solid
</style>
