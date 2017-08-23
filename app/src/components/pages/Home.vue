<template lang="pug">
  #home
    pre {{ instance }}
    pre {{ parts }}
    component(v-bind:is="instance")
</template>

<script>
import Instances from '@/components/instances'

export default {
  name: 'home',
  components: {
    Instances
  },
  data () {
    return {
    }
  },
  computed: {
    parts () {
      return window.location.hostname.split('.')
    },
    instance () {
      const parts = window.location.hostname.split('.')
      const subdomain = parts.shift()
      if ((subdomain === 'localhost') || (subdomain === 'eventspark')) {
        return 'master'
      } else {
        return parts.shift() // subdomain
      }
    }
  }
}
</script>

<style lang="stylus" scoped>

@import '~stylus/shared'

</style>
