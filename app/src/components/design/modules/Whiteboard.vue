<template lang="pug">
.design-task--whiteboard
  p.design-task--description(v-if="task.description") {{ task.description }}

  splash-messages(v-if="!isAuthenticated" v-bind:messages="[{type:'success',text:'Please login to participate!'}]")

  .whiteboard-wrapper(v-bind:class="{ authenticated: isAuthenticated }")
    iframe(v-bind:src="`https://witeboard.com/${$route.params.task_id}`" frameborder="0" width="100%" height="600")
  
</template>

<script>
import { mapGetters } from 'vuex'

import DesignTask from '@/mixins/DesignTask'

export default {
  name: 'whiteboard',
  mixins: [DesignTask],
  computed: {
    ...mapGetters(['isAuthenticated'])
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
    pointer-events none
    &.authenticated
      pointer-events all
    iframe
      border none
      position absolute
      width 100%
      height 100%
      left 0
      top 0
</style>
