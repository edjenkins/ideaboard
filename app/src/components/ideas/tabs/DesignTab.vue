<template lang="pug">

.tab-content--design
  h1.tab--header(v-bind:class="{ 'no-parent': (!$route.params.task_id) }")
    .tab--header--previous(name="home" @click="returnToDash")
      i.fas.fa-arrow-left
    .tab--header--title
      | {{ title || '' }}

  router-view(v-bind:idea="idea" v-bind:title.sync="title" v-on:back="returnToDash" keep-alive)

</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'design-tab',
  props: ['idea'],
  data () {
    return {
      title: undefined
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'user'])
  },
  methods: {
    returnToDash () {
      this.$router.push({ name: 'designdashboard' })
    },
    toggleMaximise () {
      this.$emit('toggle-maximise')
    }
  }
}
</script>

<style lang="stylus" scoped>

@import '~stylus/shared'

.tab-content--design
  min-height 600px
  margin-bottom 30px
  overflow hidden
  h1.tab--header.no-parent
    height 0 !important
    border-color transparent !important
    .tab--header--title
      opacity 0
  .tab--content
    background-color white
    border-bottom $color-border 1px solid
    padding 25px
</style>
