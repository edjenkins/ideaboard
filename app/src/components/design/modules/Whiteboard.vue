<template lang="pug">
.design-task--whiteboard
  p.design-task--description(v-if="activeTask.description") {{ activeTask.description }}

  .whiteboard-wrapper
    iframe(v-bind:src="`https://witeboard.com/${activeTask._id}`" frameborder="0" width="100%" height="400")
  
</template>

<script>
import { mapGetters } from 'vuex'
import Icon from 'vue-awesome/components/Icon'

import 'vue-awesome/icons/arrow-left'

export default {
  name: 'whiteboard',
  props: ['active-task'],
  components: {
    Icon
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated'])
  },
  methods: {
    goBack () {
      this.$emit('back')
    }
  }
}
</script>

<style lang="stylus" scoped>

@import '~stylus/shared'

.design-task--whiteboard
  background-color white
  padding 25px
  .whiteboard-wrapper
    iframe
      border none
</style>
