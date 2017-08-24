<template lang="pug">
  #about
    page-header(title="About IdeaBoard" subtitle="A little bit about the site and what we are trying to acheive")
    .row
      .content-block.pull-up.white-block
        .content-block--body
          p Add description here...
      .clearfix

    site-footer
</template>

<script>
import PageHeader from '@/components/PageHeader'
import SiteFooter from '@/components/navigation/SiteFooter'

export default {
  name: 'about',
  metaInfo: {
    title: 'About'
  },
  components: {
    PageHeader,
    SiteFooter
  }
}
</script>

<style lang="stylus" scoped>
@import '~stylus/shared'
</style>
