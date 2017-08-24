<template lang="pug">
  #home
    .row-wrapper#welcome(v-bind:style="{ 'background-color': navColor }")
      .row
        .content-block
          .content-block--body
            h1 WEA designs 
              .example {{ examples[exampleIndex] }}
            h3 Start a new idea and build your community through discussion and debate.
    
    featured-ideas
    splash-image

    site-footer
</template>

<script>
import Home from '@/mixins/Home'

export default {
  name: 'wea',
  metaInfo: {
    title: 'WEA'
  },
  mixins: [Home]
}
</script>

<style lang="stylus" scoped>
@import '~stylus/home'
</style>
