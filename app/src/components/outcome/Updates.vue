<template lang="pug">
ul#idea-updates
  li#idea-update-composer(v-if="ownIdea")
    .input-wrapper
      input(type="text" v-model="newUpdate.text" placeholder="Share an update with your subscribers.." v-on:keyup.enter="postUpdate()")
      .btn.btn-primary(@click="postUpdate()") Send
  li.idea-update(v-for="(update, index) in orderedUpdates" v-bind:key="index")
    .user-wrapper
      .user-wrapper--name {{ update._user.profile.name }}
      .user-wrapper--avatar(v-bind:style="{ 'background-image': `url(${update._user.profile.avatar})` }")
    .update-wrapper
      p {{ update.text }}
  li.idea-update
    .user-wrapper
      .user-wrapper--name {{ idea._user.profile.name }} created the Idea
      avatar.user-wrapper--avatar(v-bind:profile="idea._user.profile")
</template>

<script>
import _ from 'lodash'
import API from '@/api'
import { mapGetters } from 'vuex'

import Avatar from '@/components/user/Avatar'

export default {
  name: 'updates',
  props: ['idea'],
  components: {
    Avatar
  },
  created () {
    this.fetchUpdates()
  },
  data () {
    return {
      newUpdate: {
        text: undefined
      },
      updates: []
    }
  },
  computed: {
    ...mapGetters(['user']),
    orderedUpdates () {
      return _.orderBy(this.updates, ['created'], ['desc'])
    },
    ownIdea () {
      return this.isAuthenticated && (this.user._id === this.idea._user._id)
    }
  },
  methods: {
    fetchUpdates () {
      API.update.fetch(
        this.idea._id,
        (response) => {
          this.$log(response)
          this.updates = response.data
        },
        (error) => {
          this.$log(error)
        }
      )
    },
    postUpdate () {
      API.update.post(
        this.idea._id,
        this.newUpdate,
        (response) => {
          this.$log(response)
          this.updates.push(response.data)
          this.newUpdate.text = undefined
        },
        (error) => {
          this.$log(error)
          alert('Something went wrong')
        }
      )
    }
  }
}
</script>

<style lang="stylus" scoped>

@import '~stylus/shared'

// Updates
ul#idea-updates
  cleanlist()
  padding 25px
  li.idea-update
    cleanlist()
    background-color white
    &:last-child
      margin-bottom 0
    .user-wrapper
      height 40px
      padding-left 50px
      position relative
      .user-wrapper--name
        font-weight bold
        line-height 40px
      .user-wrapper--avatar
        radius(50%)
        background-image($color-light-grey)
        height 40px
        width 40px
        position absolute
        top 0
        left 0
    .update-wrapper
      border-left $color-primary 4px solid
      margin-left 18px
      padding 0px 20px 25px 28px
      p
        reset()


  
#idea-update-composer
  animate()
  margin 10px 0 20px 0
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
      font-size 0.9em
      line-height 30px
      outline 0
      padding 5px 10px
      padding-right 80px
      width calc(100% - 80px)
      
</style>
