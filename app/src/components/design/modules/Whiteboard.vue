<template lang="pug">
.design-task--whiteboard
  p.design-task--description(v-if="activeTask.description") {{ activeTask.description }}

  .whiteboard-wrapper
    iframe(v-bind:src="`https://witeboard.com/${activeTask._id}`" frameborder="0" width="100%" height="600")
  
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'whiteboard',
  props: ['active-task'],
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
    position relative
    width 100%
    height 0
    padding-bottom 75%
    iframe
      border none
      position absolute
      width 100%
      height 100%
      left 0
      top 0
</style>
