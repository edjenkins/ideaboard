<template lang="pug">
.design-task--media
  p.design-task--description(v-if="activeTask.description") {{ activeTask.description }}
</template>

<script>
import Icon from 'vue-awesome/components/Icon'
import 'vue-awesome/icons/arrow-left'

export default {
  name: 'media',
  props: ['active-task'],
  components: {
    Icon
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

.design-task--media
  background-color white
  padding 25px
</style>
