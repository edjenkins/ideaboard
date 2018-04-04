<template lang="pug">
.design-task--poll
  p.design-task--description(v-if="task.description") {{ task.description }}

  //- splash-messages(v-if="!isAuthenticated" v-bind:messages="[{type:'success',text:'Please login to participate!'}]")

  .poll-wrapper
    transition-group(tag="ul" class="poll-responses" name="fade")
      li.poll-response(v-for="(response, index) in orderedResponses" v-bind:key="index")
        .poll-response--title {{ response.response.text }}
        avatar.poll-response--user(v-bind:profile="response._user.profile")
        .poll-response--votes(@click="checkAuth" v-bind:class="{ positive: ((response._likes.length - response._dislikes.length) > 0), negative: ((response._likes.length - response._dislikes.length) < 0) }")
          .poll-response--votes--value {{ (response._likes.length - response._dislikes.length) }}
          voting-buttons(v-bind:response="response" v-on:like="likeResponse(response._id)" v-on:dislike="dislikeResponse(response._id)")

    // Submit a response
    .response-composer
      .input-wrapper(@click="checkAuth")
        input(v-bind:disabled="!isAuthenticated" type="text" v-model="newResponse.text" placeholder="Add a poll option..." v-on:keyup.enter="submitResponse")
        .btn.btn-primary(@click="submitResponse")
          i.fas.fa-arrow-right
</template>

<script>
import _ from 'lodash'
import Vue from 'vue'
import { mapGetters } from 'vuex'
import * as types from '@/store/mutation-types'
import API from '@/api'

import DesignTask from '@/mixins/DesignTask'

import VotingButtons from '@/components/voting/VotingButtons'
import Avatar from '@/components/user/Avatar'

export default {
  name: 'poll',
  mixins: [DesignTask],
  components: {
    VotingButtons,
    Avatar
  },
  created () {
    this.fetchResponses()
  },
  data () {
    return {
      newResponse: {
        text: ''
      },
      responses: []
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'user']),
    orderedResponses () {
      return _.sortBy(this.responses, (response) => {
        return response._likes.length - response._dislikes.length
      }).reverse()
    }
  },
  methods: {
    hasVoted (votes) {
      if (!this.user) return false
      return _.find(votes, (vote) => {
        return vote._user._id === this.user._id
      })
    },
    fetchResponses () {
      API.task.fetchResponses(
        'poll',
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
      // if (!this.isAuthenticated) return
      API.task.submitResponse(
        'poll',
        this.$route.params.task_id,
        { response: this.newResponse },
        (response) => {
          this.$log(response)
          this.responses.push(response.data)
          this.newResponse.text = ''
        },
        (error) => {
          this.$log(error)
        }
      )
    },
    likeResponse (responseId) {
      if (!this.isAuthenticated) return
      // Like
      API.task.likeResponse(
        responseId,
        (response) => {
          this.$log(response)
          _.each(this.responses, (existingResponse, index) => {
            if (existingResponse._id === responseId) {
              Vue.set(this.responses, index, response.data) // Update existing response
            }
          })
        },
        (error) => {
          this.$log(error)
          alert('Failed to like')
        }
      )
    },
    dislikeResponse (responseId) {
      if (!this.isAuthenticated) return
      // Dislike
      API.task.dislikeResponse(
        responseId,
        (response) => {
          this.$log(response)
          _.each(this.responses, (existingResponse, index) => {
            if (existingResponse._id === responseId) {
              Vue.set(this.responses, index, response.data) // Update existing response
            }
          })
        },
        (error) => {
          this.$log(error)
          alert('Failed to dislike')
        }
      )
    },
    checkAuth () {
      if (!this.isAuthenticated) {
        this.$store.commit(types.SHOW_AUTH_MODAL)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>

@import '~stylus/shared'

.design-task--poll
  background-color white
  padding 25px

 .poll-wrapper
    margin-top 30px
    ul.poll-responses
      cleanlist()
      li.poll-response
        cleanlist()
        border-bottom $color-border 1px dashed
        line-height 24px
        min-height 24px
        padding 23px 10px
        margin-left 50px
        padding-left 0px
        padding-right 60px
        position relative
        &:last-child
          border-bottom none
        .poll-response--title
          position relative
        .poll-response--user
          radius(50%)
          background-image($color-lighter-grey)
          height 40px
          width 40px
          position absolute
          top 15px
          left -50px
        .poll-response--votes
          color $color-text-dark-grey
          font-weight bold
          height 70px
          width 60px
          line-height 70px
          position absolute
          top 0
          right 0
          text-align left
          &.positive
            color $color-success
          &.negative
            color $color-danger
          .poll-response--votes--value
            width 30px
            text-align center
  
  .response-composer
    animate()
    margin-top 20px
    opacity 1
    position relative
    .btn
      pinned()
      position absolute
      left auto
      line-height 40px
      padding 0
      width 40px
    .input-wrapper
      border $color-border 1px solid
      input
        border none
        box-sizing border-box
        line-height 30px
        outline 0
        padding 5px 10px
        padding-right 50px
        width calc(100% - 80px)
</style>
