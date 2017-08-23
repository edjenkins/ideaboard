<template lang="pug">
  #home
    pre {{ instance }}
    component(v-bind:is="instance")
</template>

<script>
import Master from '@/components/pages/instances/Master'
import WEA from '@/components/pages/instances/WEA'

export default {
  name: 'home',
  components: {
    Master,
    WEA
  },
  data () {
    return {
    }
  },
  computed: {
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
