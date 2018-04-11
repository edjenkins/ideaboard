<template lang="pug">
  .your-permissions
    h1.tab--header.no-parent
      .tab--header--title Your Permissions
      .tab--header--action(@click="expanded = !expanded")
        span(v-show="expanded") #[i.fas.fa-angle-up]
        span(v-show="!expanded") #[i.fas.fa-angle-down]
    
    .tab--content(v-if="expanded")
      p(v-for="(permission, index) in user.permissions" v-bind:key="index") {{ `${permission.description} (${permission.type} - ${permission.instance})` }}
      p(v-if="user.permissions.length === 0") You have no permissions

</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'your-permissions',
  data () {
    return {
      expanded: false
    }
  },
  computed: {
    ...mapGetters(['user'])
  }
}
</script>

<style lang="stylus" scoped>
  @import '~stylus/shared'
</style>
