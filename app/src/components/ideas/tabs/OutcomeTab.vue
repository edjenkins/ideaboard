<template lang="pug">

.tab-content--outcome
  h1.tab--header(v-bind:class="{ 'no-parent': ($route.name === 'outcomedashboard') }")
    .tab--header--previous(name="home" @click="goToDashboard")
      i.fas.fa-arrow-left
      
    .tab--header--title {{ title || '' }}
    //- .tab--header--action
      span(v-if="activeComponent && (activeComponent != 'dashboard')") {{ activeComponent }}
      span(v-else)
        i.fas.fa-question

  router-view(v-bind:idea="idea" v-bind:title.sync="title" v-on:back="goToDashboard" keep-alive)

</template>

<script>
export default {
  name: 'outcome-tab',
  props: ['idea'],
  data () {
    return {
      title: undefined
    }
  },
  methods: {
    goToDashboard () {
      this.$router.back()
    }
  }
}
</script>

<style lang="stylus" scoped>

@import '~stylus/shared'

.tab-content--outcome
  background-color white
  h1.tab--header.no-parent
    height 0 !important
    padding-top 0 !important
    padding-bottom 0 !important
    min-height 0 !important
    border none !important
    opacity 0 !important
  .tab--content
    border-bottom $color-border 1px solid
    padding 20px
    p
      reset()
</style>