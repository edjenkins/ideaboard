<template lang="pug">
  #profile(v-if="editedProfile && currentUser")
    page-header(v-bind:title="title" v-bind:subtitle="subtitle")
    .row
      .content-block.content-block--side.pull-up.pull-left.white-block
        .content-block--body
          user-card(v-bind:profile="currentUser.profile")
        .content-block--footer(v-if="ownProfile")
          .btn.btn-danger-subtle(@click="logout") Logout
      .content-block.content-block--main.pull-up.pull-right.white-block
        .tabs
          .tabs--selector
            .tabs--selector--item(v-for="(tab, index) in tabItems" v-bind:class="{ active: (tab.component === tabs.activeComponent) }" @click="tabs.activeComponent = tab.component") {{ tab.title }}
            .clearfix
          .tabs--page
            component(v-bind:is="tabs.activeComponent" v-bind:edited-profile.sync="editedProfile" v-bind:current-user="currentUser" v-bind:own-profile="ownProfile")

        //- .notifications(v-if="ownProfile && tabs.activeComponent === 'bio-tab'")
          notifications-list(type="unread" v-bind:notifications="notifications.unread")
          notifications-list(type="read" v-bind:notifications="notifications.read")
      .clearfix
</template>

<script>
import API from '@/api'
import { mapGetters } from 'vuex'

import _filter from 'lodash/filter'

import PageHeader from '@/components/PageHeader'
import UserCard from '@/components/user/UserCard'

import BioTab from '@/components/user/tabs/BioTab'
import IdeasTab from '@/components/user/tabs/IdeasTab'
import CategoriesTab from '@/components/user/tabs/CategoriesTab'
import AdminTab from '@/components/user/tabs/AdminTab'
import NotificationsList from '@/components/user/NotificationsList'

export default {
  name: 'profile',
  metaInfo: {
    title: 'Profile'
  },
  components: {
    PageHeader,
    UserCard,
    BioTab,
    IdeasTab,
    CategoriesTab,
    AdminTab,
    NotificationsList
  },
  mounted () {
    this.loadProfile()
  },
  created () {
    if (this.$session.has('auth-redirect')) {
      const redirect = this.$session.get('auth-redirect')
      this.$session.remove('auth-redirect')
      window.location = redirect
    }
  },
  watch: {
    '$route.params.id': {
      handler: function (nV, oV) {
        if (nV === oV) return
        this.loadProfile()
      },
      deep: true
    },
    isAuthenticated (nV) {
      if (!nV) {
        this.$router.push('/')
      }
    }
  },
  data () {
    return {
      currentUser: {
        profile: {
          name: '',
          avatar: '',
          bio: ''
        }
      },
      editedProfile: {
        name: '',
        avatar: '',
        bio: ''
      },
      tabs: {
        activeComponent: 'bio-tab',
        items: [
          { title: 'Profile', component: 'bio-tab', permission: undefined },
          // { title: 'Ideas', component: 'ideas-tab', permission: undefined },
          { title: 'Categories', component: 'categories-tab', permission: 'organiser' },
          { title: 'Admin', component: 'admin-tab', permission: 'admin' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'isAuthenticated', 'user', 'notifications', 'isAdmin', 'isOrganiser', 'isModerator'
    ]),
    tabItems () {
      return _filter(this.tabs.items, (item) => {
        switch (item.permission) {
          case 'admin':
            return this.isAdmin && this.ownProfile
          case 'organiser':
            return this.isOrganiser && this.ownProfile
          case 'moderator':
            return this.isModerator && this.ownProfile
          default:
            return true
        }
      })
    },
    title () {
      if (!this.user) return false
      if (!this.currentUser) return false
      return this.ownProfile ? 'Your Profile' : this.currentUser.profile.name
    },
    subtitle () {
      if (!this.user) return false
      if (!this.currentUser) return false
      return this.ownProfile ? 'Here you can update your bio, check out your ideas and much more' : `Check out ${this.currentUser.profile.name}'s profile and their recent activity`
    },
    ownProfile () {
      return !this.$route.params.id || (this.$route.params.id === this.user._id)
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('logout')
    },
    loadProfile () {
      API.user.fetch(
        this.$route.params.id ? this.$route.params.id : this.user._id,
        (response) => {
          console.log(response)
          this.currentUser = response.data
          this.$set(this.currentUser.profile, 'name', response.data.profile.name)
          this.$set(this.currentUser.profile, 'avatar', response.data.profile.avatar)
          this.$set(this.currentUser.profile, 'bio', response.data.profile.bio)
          if (this.ownProfile) {
            this.$set(this.editedProfile, 'name', response.data.profile.name)
            this.$set(this.editedProfile, 'avatar', response.data.profile.avatar)
            this.$set(this.editedProfile, 'bio', response.data.profile.bio)
          }
        },
        (error) => {
          console.error(error)
        }
      )
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~stylus/shared'

$side-block-width = 260px

#profile
  text-align center
  .content-block--main
    margin-bottom 30px
    width calc(100% - 280px)
    @media(max-width: 860px)
      width calc(100% - 240px)
    @media(max-width: 660px)
      float none
      margin 0
      width 100%

  .content-block--side
    margin-bottom 30px
    width $side-block-width
    @media(max-width: 860px)
      max-width 220px
      width calc($side-block-width - 40px)
    @media(max-width: 660px)
      float none
      margin -40px 0 20px 0
      max-width none
      width 100%
    .content-block--footer
      border-top-style solid
      padding 0
      .btn
        max-width none
</style>
