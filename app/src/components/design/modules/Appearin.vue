<template lang="pug">
.design-task--appearin
  p.design-task--description(v-if="task.description") {{ task.description }}

  splash-messages(v-if="!isAuthenticated" v-bind:messages="[{type:'success',text:'Please login to participate!'}]")

  .appearin-wrapper(v-if="isAuthenticated")
    iframe(v-bind:src="`https://meet.jit.si/${$route.params.task_id}`" frameborder="0" width="100%" height="400" allow="microphone; camera")
    //- iframe(v-bind:src="`https://appear.in/${$route.params.task_id}`" frameborder="0" width="100%" height="400")
  
</template>

<script>
import { mapGetters } from 'vuex'

import DesignTask from '@/mixins/DesignTask'

export default {
  name: 'appearin',
  mixins: [DesignTask],
  computed: {
    ...mapGetters(['isAuthenticated'])
  }
}
</script>

<style lang="stylus" scoped>

@import '~stylus/shared'

.design-task--appearin
  background-color white
  padding 25px
  .appearin-wrapper
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
