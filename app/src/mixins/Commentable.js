import Vue from 'vue'
import { mapGetters } from 'vuex'
import API from '@/api'
import _forEach from 'lodash/forEach'

export default {
  created () {
    this.fetchComments()
  },
  data () {
    return {
      replyTarget: undefined,
      newReply: {
        text: undefined
      },
      newComment: {
        text: undefined
      },
      comments: []
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'user'])
  },
  methods: {
    replyToComment (target) {
      this.replyTarget = target
    },
    fetchComments () {
      API.comment.fetch(
        {
          target: this.commentTarget,
          type: this.commentType
        },
        (response) => {
          this.$log(response)
          this.comments = response.data
        },
        (error) => {
          this.$log(error)
        }
      )
    },
    postComment () {
      // Abort if unauthenticated
      if (!this.isAuthenticated) return
      const comment = {
        text: this.replyTarget ? this.newReply.text : this.newComment.text,
        _target: this.replyTarget ? this.replyTarget : this.commentTarget,
        type: this.replyTarget ? 'comment' : this.commentType
      }
      API.comment.post(
        comment,
        (response) => {
          this.$log(response)
          if (comment.type === 'comment') {
            _forEach(this.comments, (comment) => {
              if (comment._id === this.replyTarget) {
                // Found
                Vue.set(comment, '_replies', response.data.comment._replies)
              }
            })
          } else {
            this.comments.push(response.data.comment)
          }
          this.newComment.text = ''
          this.newReply.text = ''
        },
        (error) => {
          this.$log(error)
        }
      )
    }
  }
}
