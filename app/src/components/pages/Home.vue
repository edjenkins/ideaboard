<template lang="pug">
  #home
    pre {{ instance }}
    pre {{ parts }}
    component(v-bind:is="instance")
</template>

<script>
import * as Instances from '@/components/instances'

export default {
  name: 'home',
  components: {
    Instances
  },
  computed: {
    parts () {
      return window.location.hostname.split('.')
    },
    instance () {
      return 'master'
    }
  }
}
</script>

<style lang="stylus" scoped>

@import '~stylus/shared'

</style>
