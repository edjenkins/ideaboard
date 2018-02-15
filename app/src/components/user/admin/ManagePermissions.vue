<template lang="pug">
  .manage-permissions
    h1.tab--header.no-parent
      | Manage Permissions
      .tab--header--action(@click="expanded = !expanded")
        icon(v-bind:name="expanded ? 'angle-up' : 'angle-down'")

    .tab--content(v-if="expanded")
      table(border="0")
        tr(v-if="search.result || users.length > 0")
          td
          td(v-for="(permission, index) in permissions" align="center")
            strong(v-bind:title="permission.description") {{ permission.type }}
          td
            
        tr(v-for="(user, index) in users")
          td(v-bind:title="user.local.email")
            strong {{ user.profile.name }}
          td(v-for="(permission, index) in permissions" v-bind:class="{ 'has-permission': hasPermission(user, permission) }" align="center")
            icon(v-bind:name="hasPermission(user, permission) ? 'check' : 'times'")
          td(align="center")
            icon(name="ban")
        
        tr(v-if="search.result")
          td
            | {{ search.result.profile.name }}


          td(v-if="search.query.length > 0" v-for="(permission, index) in permissions" align="center")
            input(type="checkbox" v-model="newPermissions[permission._id]")

          td(v-if="search.query.length > 0" align="center")
            //- icon(name="envelope")
            .btn.btn-success(@click="updatePermissions(search.result._id)") Save

        tr
          td
            input(v-model="search.query" type="text" placeholder="Search for user by email..." v-on:keyup="searchUsers")
            
</template>

<script>
import API from '@/api'
import 'vue-awesome/icons'

export default {
  name: 'manage-permissions',
  data () {
    return {
      expanded: true,
      permissions: [],
      users: [],
      newPermissions: {},
      search: {
        query: '',
        result: undefined
      }
    }
  },
  mounted () {
    this.fetchPermissions()
  },
  methods: {
    updatePermissions (userId) {
      API.permission.update(
        userId,
        this.newPermissions,
        (response) => {
          this.fetchPermissions()
          this.search.query = ''
          this.search.result = undefined
        },
        (response) => {
          alert('ooops')
          this.fetchPermissions()
        }
      )
    },
    searchUsers () {
      API.user.search(
        this.search.query,
        (response) => {
          this.search.result = response.data
        },
        (response) => {
          this.search.result = undefined
        }
      )
    },
    fetchPermissions () {
      API.permission.fetch(
        (response) => {
          this.permissions = response.data.permissions
          this.users = response.data.users
        },
        (response) => {
          this.permissions = []
          this.users = []
        }
      )
    },
    hasPermission (user, permission) {
      return user._permissions.indexOf(permission._id) !== -1
    }
  }
}
</script>

<style lang="stylus" scoped>

@import '~stylus/shared'

.manage-permissions
  .tab--content
    table
      width 100%
      .btn
        reset()
        line-height 36px
        height 36px
    table, th, td
      border 1px solid $color-border
      border-collapse collapse
    td
      padding 10px
      position relative
      input[type="text"]
        border none
        font-size 0.9em
        line-height 30px
        outline 0
        padding 0 10px
        width calc(100% - 20px)
      .fa-icon
        color $color-grey
      &.has-permission
        .fa-icon
          color $color-success

    ul.search-results
      cleanlist()
      li.search-result
        cleanlist()
        border-top $color-border 1px solid
        margin-top 10px
        padding-top 10px
</style>
