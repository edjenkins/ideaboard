<template lang="pug">
  #consent-modal(v-if="isAuthenticated && !hasConsented")
    .consent-panel

      h1 Consent
      
      splash-messages(v-bind:messages="splashmessages")

      p Welcome back {{ user.profile.name }}, in order to comply with GDPR we need you to consent to the following before continuing to use this service:
      
      .text-right
        p.consent-notice #[input(v-model="researchConsent" type="checkbox")] I understand this service is provided by Open Lab as a research project and agree to the #[router-link(v-bind:to="{ name: 'research' }") Research Policy]
        p.consent-notice #[input(v-model="privacyConsent" type="checkbox")] I accept the #[router-link(v-bind:to="{ name: 'privacy' }") Privacy Policy]
        p.consent-notice #[input(v-model="termsConsent" type="checkbox")] I accept the #[router-link(v-bind:to="{ name: 'terms' }") Terms of Use]

      .btn.btn-rounded.full-width.btn-success(@click="confirmConsent") {{ isConsenting ? 'Please wait..' : 'Confirm' }}
      .clearfix

</template>

<script>
import * as types from '@/store/mutation-types'
import { mapGetters } from 'vuex'
import API from '@/api'

import SplashMessages from '@/components/shared/SplashMessages'

import AuthMixin from '@/mixins/AuthMixin'

export default {
  name: 'consent-modal',
  components: {
    SplashMessages
  },
  mixins: [
    AuthMixin
  ],
  data () {
    return {
      splashmessages: [],
      isConsenting: false,
      researchConsent: false,
      privacyConsent: false,
      termsConsent: false
    }
  },
  computed: {
    ...mapGetters([
      'isAuthenticated', 'hasConsented', 'user'
    ])
  },
  watch: {
    isAuthenticated (nV) {
      if (nV) {
        this.$store.commit(types.HIDE_AUTH_MODAL)
      }
    }
  },
  methods: {
    confirmConsent () {
      if (this.isConsenting) return
      this.isConsenting = true
      const request = { researchConsent: this.researchConsent, privacyConsent: this.privacyConsent, termsConsent: this.termsConsent }
      API.auth.consent(request,
        (response) => {
          // Auth redirect
          this.$log(response)
          this.$store.dispatch('checkAuthStatus')
          setTimeout(() => { this.isConsenting = false }, 500)
          this.splashmessages = response.data.errors
        },
        (error) => {
          // Auth fail
          this.$log(error)
          this.isConsenting = false
          this.splashmessages = [{ text: 'Something went wrong', type: 'error' }]
        })
    }
  }
}
</script>

<style lang="stylus" scoped>

@import '~stylus/auth'

#consent-modal
  pinned()
  position fixed
  z-index 50

  &:before
    pinned()
    background-color alpha(black, 0.7)
    content ''
    position fixed

  #close-button
    position absolute
    top 0
    right 0
    padding 20px

  .consent-panel
    center-align()
    background-color white
    max-width calc(100% - 20px)
    width 320px
    box-sizing border-box
    margin 0 auto
    padding 20px
    text-align center
    .text-right
      text-align left

  .consent-form
    text-align left
    h2
      reset()
      color $text-grey
      padding 10px
</style>

