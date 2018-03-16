import API from '@/api'

export default {
  props: ['title', 'idea'],
  data () {
    return {
      task: undefined
    }
  },
  created () {
    API.task.view(
      this.$route.params.task_id,
      (response) => {
        this.$log(response)
        this.task = response.data.task
        this.$emit('update:title', this.task.title)
      },
      (error) => {
        this.$log(error)
      }
    )
  }
}
