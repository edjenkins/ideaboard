import { mapGetters } from 'vuex'
import API from '@/api'

export default {
  computed: {
    ...mapGetters(['isAuthenticated', 'isAdmin', 'isModerator', 'user'])
  },
  methods: {
    reportOrDestroy (type, id, user) {
      const action = this.isModerator ? 'destroy' : 'report'
      // const action = this.isModerator || (user._id === this.user._id) ? 'destroy' : 'report'

      switch (action) {
        case 'report':
          this.reportContent(type, id)
          break

        case 'destroy':
          this.destroyContent(type, id)
          break
      }
    },
    destroyContent (type, id) {
      if (!this.isModerator) return
      API[type].destroy(
        { type: type, id: id },
        (response) => {
          this.$log(response)
          try {
            this.contentChanged()
          } catch (error) {
            console.log('contentChanged method not found')
            console.error(error)
          }
        },
        (error) => {
          this.$log(error)
        }
      )
    },
    reportContent (type, id) {
      API.moderate.report(
        { type: type, id: id },
        (response) => {
          this.$log(response)
        },
        (error) => {
          this.$log(error)
        }
      )
    }
  }
}
