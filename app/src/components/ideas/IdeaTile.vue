<template lang="pug">
  .idea-tile
    .idea-tile--banner(v-if="idea.banner" v-bind:style="(idea.banner && idea.banner.location) ? idea.banner.location : idea.banner | resize('220', '140') | background")
    .idea-tile--body
      .idea-tile--title(v-bind:class="{ 'is-placeholder': !idea.title }") {{ idea.title || 'Example Idea' }}
      .idea-tile--author(v-if="idea._user") {{ idea._user.profile.name }}
      .idea-tile--tagline(v-bind:class="{ 'is-placeholder': !idea.tagline }") {{ idea.tagline || 'This is an example tagline' }}
    .idea-tile--footer {{ idea._subscribers ? `${idea._subscribers.length} Subscribers` : 'No Subscribers' }} 
</template>

<script>
export default {
  name: 'idea-tile',
  props: ['idea']
}
</script>

<style lang="stylus" scoped>
@import '~stylus/shared'

.idea-tile
  background-color white
  height 360px
  overflow hidden
  position relative
  text-align left
  .idea-tile--banner
    animate()
    background-image($color-lightest-grey)
    pinned()
    bottom auto
    height 0
    padding-bottom 60%
    position absolute
  .idea-tile--body
    animate()
    padding 20px
    padding-top calc(60% + 20px)
    .idea-tile--title
      color $color-text-dark-grey
      font-size 1.2em
      font-weight bold
    .idea-tile--author
      color $color-text-grey
      font-size 0.8em
      font-weight normal
      margin-bottom 10px
    .idea-tile--tagline
      color $color-text-grey
      font-weight normal
    .is-placeholder
      color $color-text-light-grey
  .idea-tile--footer
    animate()
    pinned()
    background-color white
    color $color-text-light-grey
    font-size 0.8em
    line-height 32px
    top auto
    bottom -32px
    position absolute
    text-align center
  &:hover
    cursor pointer
    .idea-tile--banner
      top -20px
    .idea-tile--body
      padding-top 60%
    .idea-tile--footer
      bottom 0

</style>
