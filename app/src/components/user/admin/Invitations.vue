<template lang="pug">
  .invitations
    h1.tab--header.no-parent
      | Invitations
      .tab--header--action(@click="expanded = !expanded")
        icon(v-bind:name="expanded ? 'angle-up' : 'angle-down'")

    .tab--content(v-if="expanded")
      
      p Invite friends and colleagues to help moderate, organise and manage the system.
      br
      action-text-field(placeholder="Enter their email address.." v-bind:action="`Send Invite`" v-model="recipient" v-on:performedAction="sendInvitation")
      splash-messages(v-bind:messages="splashMessages")
      
      //- .invitations
        .invitation-group(v-if="invitations.pending.length !== 0")
          h5 Pending invitations
          p(v-for="(invitation, index) in invitations.pending" v-bind:key="index")
            | {{ invitation.recipient }}
            button(@click="updateInvitationStatus(invitation, 'cancel')") cancel

        .invitation-group(v-if="invitations.accepted.length !== 0")
          h5 Accepted invitations
          p(v-for="(invitation, index) in invitations.accepted" v-bind:key="index")
            | {{ invitation.recipient }}

        .invitation-group(v-if="invitations.cancelled.length !== 0")
          h5 Cancelled invitations
          p(v-for="(invitation, index) in invitations.cancelled" v-bind:key="index")
            | {{ invitation.recipient }}

        .invitation-group(v-if="invitations.declined.length !== 0")
          h5 Declined invitations
          p(v-for="(invitation, index) in invitations.declined" v-bind:key="index")
            | {{ invitation.recipient }}
</template>

<script>
import API from '@/api'
import ActionTextField from '@/components/shared/ActionTextField'

import SplashMessages from '@/components/shared/SplashMessages'

export default {
  name: 'invitations',
  components: {
    ActionTextField,
    SplashMessages
  },
  mounted () {
    this.fetchInvitations()
  },
  data () {
    return {
      expanded: false,
      invitations: [],
      recipient: undefined,
      type: undefined,
      splashMessages: []
    }
  },
  methods: {
    toggle (identifier) {
      this.toggles[identifier] = !this.toggles[identifier]
    },
    sendInvitation () {
      API.invitation.send(
        this.recipient,
        (response) => {
          // Invitations fetched
          this.$log(response)
          this.fetchInvitations()
          this.$store.dispatch('getNotifications')
          if (response.data.errors) {
            this.splashMessages = response.data.errors
          } else {
            this.splashMessages = [
                { text: 'Invite sent!', type: 'success' }
            ]
          }
        },
        (error) => {
          // Failed to fetch invitations
          this.$log(error)
        })
    },
    fetchInvitations () {
      API.invitation.fetchInvitations(
        (response) => {
          // Invitations fetched
          this.$log(response)
          this.invitations = response.data
        },
        (error) => {
          // Failed to fetch invitations
          this.$log(error)
        })
    },
    updateInvitationStatus (invitation, action) {
      API.invitation.updateInvitationStatus(
        {
          action: action,
          _id: invitation._id
        },
        (response) => {
          // Invitations fetched
          this.$log(response)
          this.fetchInvitations()
        },
        (error) => {
          // Failed to fetch invitations
          this.$log(error)
        })
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '~stylus/shared'
</style>
