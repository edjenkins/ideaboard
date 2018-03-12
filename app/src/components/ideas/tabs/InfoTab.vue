<template lang="pug">
.tab-content--info
  //- h1.tab--header.no-parent
    //- .tab--header--title {{ idea.title }}
    .tab--header--title About
    .tab--header--action(v-if="ownIdea")
      i.fas.fa-pencil
      
  .tab--content
    rendered-content(v-bind:content="idea.description")
  .tab--footer
    subscribe-button(v-bind:idea="idea" v-on:subscribed="$emit('show-design')")

  //- #general-discussion
    //- h1.tab--header.no-parent
      .tab--header--title General Chat
    discussion(v-bind:idea="idea" v-bind:hide-no-comments="true" v-bind:activeTask="{ title: 'discussion', component: 'discussion' }")

  //- #design-banner(@click="viewDesign()")
    span(v-if="idea._subscribers.length > 2") Join {{ idea._subscribers.length }} people in disscussing this idea!
    span(v-else) Join the discussion
    i.fas.fa-long-arrow-alt-right
    

</template>

<script>
import { mapGetters } from 'vuex'
import RenderedContent from '@/components/shared/RenderedContent'
import SubscribeButton from '@/components/ideas/actions/SubscribeButton'
import Discussion from '@/components/design/modules/Discussion'
import IdeaTile from '@/components/ideas/IdeaTile'

export default {
  name: 'info-tab',
  props: ['idea'],
  components: {
    RenderedContent,
    SubscribeButton,
    Discussion,
    IdeaTile
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'user', 'instanceBackground']),
    ownIdea () {
      return this.isAuthenticated && (this.user._id === this.idea._user._id)
    }
  },
  methods: {
    viewDesign () {
      this.$emit('show-design')
    }
  }
}
</script>

<style lang="stylus" scoped>

@import '~stylus/shared'

.tab-content--info
  background-color white
  border-bottom $color-border 1px solid
  text-align left
  .tab--content
    min-height 240px
    padding 25px
    p
      reset()
  .tab--footer
      display none
      padding 20px
  @media(max-width: 680px)
    .tab--footer
      display block

  #general-discussion
    border-top $color-border 1px solid

  #design-banner
    animate()
    background-color $color-design
    color white
    font-size 1em
    font-weight bold
    line-height 20px
    padding 20px 20px
    padding-right 60px
    position relative
    @media(max-width: 680px)
      display none
    svg
      animate()
      color white
      position absolute
      top 0
      right 0
      padding 15px
      width 30px
      height 30px
    &:hover
      cursor pointer
      background-color darken($color-design, 5%)
      svg
        right -5px

</style>
