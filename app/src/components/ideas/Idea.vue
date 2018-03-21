<template lang="pug">
  #idea(v-bind:class="{ maximised: maximised }")
    page-header(v-if="idea" v-bind:title="idea.title" v-bind:subtitle="`Started by ${idea._user.profile.name}`" v-bind:image="idea.banner")
    page-header(v-else title="Loading" subtitle="Please wait just a moment...")
    .row(v-if="idea")

      .content-block.content-block--side.pull-up.pull-right.white-block
        .content-block--body
          user-card(v-bind:profile="idea._user.profile" v-bind:id="idea._user._id")
        .content-block--footer
          idea-actions(v-if="isAdmin" v-bind:idea="idea")
          subscribe-button(v-bind:idea="idea" v-on:subscribed="showDesign(2000)")

      .content-block.content-block--main.pull-up.pull-left
        .content-block--banner(v-bind:style="{ 'background-image': `url(${idea.banner})` }")
        .tabs
          .tabs--selector
            router-link.tabs--selector--item(v-for="(tab, index) in tabs.items" v-bind:key="index" v-bind:to="{ name: tab.route }")
              | {{ tab.title }}
              .notification-bubble(v-if="getNotificationCount(tab.route) > 0") {{ getNotificationCount(tab.route) }}
            .clearfix
          .tabs--page
            router-view(v-bind:idea="idea" v-on:show-design="showDesign(0)" v-on:toggle-maximise="maximisedView = !maximisedView" keep-alive)
      .clearfix

</template>

<script>
import API from '@/api'
import { mapGetters } from 'vuex'
import _get from 'lodash/get'

import IdeaActions from '@/components/admin/IdeaActions'
import PageHeader from '@/components/PageHeader'
import UserCard from '@/components/user/UserCard'
import SubscribeButton from '@/components/ideas/actions/SubscribeButton'

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
    IdeaActions,
    PageHeader,
    UserCard,
    SubscribeButton
  },
  created () {
    this.loadIdea()
  },
  data () {
    return {
      maximisedView: false,
      idea: undefined,
      tabs: {
        items: [
          { title: 'Overview', route: 'idea', component: 'info-tab' },
          { title: 'Discussions', route: 'designdashboard', component: 'design-tab' },
          { title: 'Outcome', route: 'outcomedashboard', component: 'outcome-tab' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['isAdmin']),
    maximised () {
      const maximisedViews = ['outcomedocument']
      return (maximisedViews.indexOf(this.$route.name) !== -1)
    },
    ownIdea () {
      return _get(this.idea, 'user._id') === _get(this.user, '_id', 'anonymous')
    }
  },
  methods: {
    loadIdea () {
      API.idea.view(this.$route.params.id,
        (response) => {
          // Idea success
          this.$log(response.data.idea)
          this.idea = response.data.idea
        },
        (error) => {
          // Idea fail
          this.$log(error)
        })
    },
    showDesign (delay) {
      // Set active tab to design
      setTimeout(() => {
        this.$router.push({ name: 'designdashboard', params: { id: this.idea._id } })
      }, delay)
    },
    getNotificationCount (route) {
      switch (route) {
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
    animate()
    position absolute
    right 0
    width 260px
    .content-block--footer
      border-top none
      padding-top 0
    @media(max-width: 680px)
      display none
  .content-block--main
    animate()
    margin-bottom 40px
    width calc(100% - 280px)
    .content-block--banner
      animate()
      background-image(white)
      height 200px
    @media(max-width: 680px)
      width 100%
      .content-block--banner
        height 140px
  &.maximised
    .content-block--side
      transform scale(0.8)
      opacity 0
    .content-block--main
      width 100%
      .content-block--banner
        height 0
      // .tabs .tabs--selector
        // display none

</style>
