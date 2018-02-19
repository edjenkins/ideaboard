<template lang="pug">
  #idea
    page-header(v-if="idea" v-bind:title="idea.title" v-bind:subtitle="`Started by ${idea._user.profile.name}`")
    page-header(v-else title="Loading" subtitle="Please wait just a moment...")
    .row(v-if="idea")

      .content-block.content-block--side.pull-up.pull-right.white-block
        .content-block--body
          user-card(v-bind:profile="idea._user.profile" v-bind:id="idea._user._id")
        .content-block--footer
          subscribe-button(v-bind:idea="idea" v-on:subscribed="showDesign()")

      .content-block.content-block--main.pull-up.pull-left
        .content-block--banner(v-bind:style="{ 'background-image': `url(${idea.banner})` }")
        .tabs
          .tabs--selector
            .tabs--selector--item(v-for="(tab, index) in tabs.items" v-bind:class="{ active: (index === tabs.active) }" @click="tabs.active = index")
              | {{ tab.title }}
              .notification-bubble(v-if="getNotificationCount(tab.identifier) > 0") {{ getNotificationCount(tab.identifier) }}
            .clearfix
          .tabs--page
            component(v-bind:is="tabs.items[tabs.active].component" v-bind:idea="idea" v-on:show-design="showDesign()" keep-alive)
      .clearfix

</template>

<script>
import API from '@/api'
import PageHeader from '@/components/PageHeader'
import UserCard from '@/components/user/UserCard'
import SubscribeButton from '@/components/ideas/actions/SubscribeButton'

import InfoTab from '@/components/ideas/tabs/InfoTab'
import DesignTab from '@/components/ideas/tabs/DesignTab'
import OutcomeTab from '@/components/ideas/tabs/OutcomeTab'

export default {
  name: 'idea',
  metaInfo () {
    return {
      title: (this.idea && this.idea.title) ? this.idea.title : 'Idea',
      meta: [
        { p: 'og:title', c: (this.idea && this.idea.title) ? this.idea.title : 'Idea' },
        { p: 'og:image', c: (this.idea && this.idea.banner) ? this.idea.banner : '' }
      ]
    }
  },
  props: ['id'],
  components: {
    PageHeader,
    UserCard,
    SubscribeButton,
    InfoTab,
    DesignTab,
    OutcomeTab
  },
  created () {
    setTimeout(() => {
      API.idea.view(this.id,
        (response) => {
          // Idea success
          this.$log(response.data.idea)
          this.idea = response.data.idea
        },
        (error) => {
          // Idea fail
          this.$log(error)
        })
    }, 200)
  },
  data () {
    return {
      idea: undefined,
      tabs: {
        active: 0,
        items: [
          { title: 'About', identifier: 'info', component: 'info-tab' },
          { title: 'Discussion', identifier: 'design', component: 'design-tab' },
          { title: 'Outcome', identifier: 'outcome', component: 'outcome-tab' }
        ]
      }
    }
  },
  methods: {
    showDesign () {
      // Set active tab to design
      this.tabs.active = 1
    },
    getNotificationCount (identifier) {
      switch (identifier) {
        case 'design':
          // Return the total number of tasks
          return this.idea._tasks.length
        default:
          return 0
      }
    }
  }
}
</script>

<style lang="stylus" scoped>

@import '~stylus/shared'

#idea
  text-align center
  h1, h2
    reset()
    color $color-text-grey
    font-weight normal 
  .content-block--side
    width 260px
    @media(max-width: 680px)
      display none
  .content-block--main
    margin-bottom 40px
    width calc(100% - 280px)
    .content-block--banner
      background-image()
      background-color white
      height 200px
    @media(max-width: 680px)
      width 100%
      .content-block--banner
        height 140px

</style>
