<template lang="pug">
.design-task--appearin
  p.design-task--description(v-if="activeTask.description") {{ activeTask.description }}

  .appearin-wrapper
    iframe(v-bind:src="`https://appear.in/${activeTask._id}`" frameborder="0" width="100%" height="400")
  
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'appearin',
  props: ['active-task'],
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

.design-task--appearin
  background-color white
  padding 25px
  .appearin-wrapper
    iframe
      border none
</style>
