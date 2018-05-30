<template lang="pug">
  #join(v-bind:class="{ join: (state === 'join') }")
    #overlay(v-bind:style="[instanceBackground]")
    .row
      .content-block.content-block--main.white-block

        .auth-form(v-if="state === 'join'")

          .content-block--body
            h2 Get started
            a#facebook-badge(v-bind:href="oAuthLink('facebook')" target="_self")
              i.fab.fa-facebook

            form
              splash-messages(v-bind:messages="splashmessages['join']")
              .input-wrapper
                label Email
                input(v-model="user.email" v-bind:disabled="isAuthenticating" name="email" type="email" placeholder="Your email")
              .input-wrapper
                label Password
                input(v-model="user.password" v-bind:disabled="isAuthenticating" name="password" type="password" placeholder="Your password" v-on:keydown.enter="join")
                p#forgot-link(v-if="userExists" @click="state = 'forgot'") Forgot your password?

          .content-block--footer
            .input-wrapper(v-if="!userExists")
              label Name
              input(v-model="user.name" v-bind:disabled="isAuthenticating" name="name" placeholder="Your name")
            .consent(v-if="!userExists")
              p.consent-notice #[input(v-model="user.researchConsent" type="checkbox")] I understand this service is provided by Open Lab as a research project and agree to the #[router-link(v-bind:to="{ name: 'research' }") Research Policy]
              p.consent-notice #[input(v-model="user.privacyConsent" type="checkbox")] I accept the #[router-link(v-bind:to="{ name: 'privacy' }") Privacy Policy]
              p.consent-notice #[input(v-model="user.termsConsent" type="checkbox")] I accept the #[router-link(v-bind:to="{ name: 'terms' }") Terms of Use]
            .btn.btn-success.pull-right(v-bind:disabled="!userExists && !hasConsented" @click="join") {{ isAuthenticating ? 'Checking...' : 'Continue' }}
            .clearfix
          
        .auth-form(v-if="state === 'forgot'")
        
          .content-block--body
            h2 Forgot Password
            form
              splash-messages(v-bind:messages="splashmessages['forgot']")
              .input-wrapper
                label Your email
                input(v-model="user.email" name="email" type="email" placeholder="Your email" v-on:keydown.enter="forgotPassword")
          .content-block--footer
            .btn.btn-warning.pull-left(@click="state = 'join'") Back
            .btn.btn-success.pull-right(@click="forgotPassword") Continue
            .clearfix
        
      .clearfix
      
</template>

<script>
import API from '@/api'
import { mapGetters } from 'vuex'

import AuthMixin from '@/mixins/AuthMixin'

import PageHeader from '@/components/PageHeader'
import SplashMessages from '@/components/shared/SplashMessages'

import * as config from '@/api/config'

export default {
  name: 'auth',
  metaInfo: {
    title: 'Auth'
  },
  mixins: [
    AuthMixin
  ],
  components: {
    PageHeader,
    SplashMessages
  },
  mounted () {
    this.checkEmail()
  },
  data () {
    return {
      isAuthenticating: false,
      userExists: false,
      state: 'join',
      user: {
        name: config.ADMIN_NAME,
        email: config.ADMIN_EMAIL,
        password: config.ADMIN_PASSWORD,
        researchConsent: false,
        privacyConsent: false,
        termsConsent: false
      },
      splashmessages: {
        join: [],
        forgot: []
      },
      errorDump: undefined
    }
  },
  computed: {
    ...mapGetters([
      'isAuthenticated', 'instanceBackground'
    ]),
    hasConsented () {
      return this.user.researchConsent && this.user.privacyConsent && this.user.termsConsent
    }
  },
  watch: {
    isAuthenticated (nV) {
      if (nV) {
        this.$router.push('/profile')
      }
    },
    'user.email': {
      handler: function (nV, oV) {
        this.checkEmail()
      },
      deep: true
    }
  },
  methods: {
    checkEmail () {
      if (this.user.email.length < 5) return
      API.auth.exists(
        { email: this.user.email },
        (response) => {
          // Auth redirect
          this.$log(response)
          this.userExists = response.data.exists
        },
        (error) => {
          // Auth fail
          this.$log(error)
        })
    },
    join () {
      if (this.isAuthenticating) return
      // if (!this.hasConsented) return
      this.isAuthenticating = true
      this.splashmessages.join = []
      API.auth.join(this.user,
        (response) => {
          // Auth redirect
          this.$log(response)
          this.$store.dispatch('checkAuthStatus')
          setTimeout(() => { this.isAuthenticating = false }, 500)
          this.splashmessages.join = response.data.errors
        },
        (error) => {
          // Auth fail
          this.$log(error)
          this.isAuthenticating = false
          this.splashmessages.join = [{ text: 'Something went wrong', type: 'error' }]
        })
    },
    forgotPassword () {
      API.auth.forgot(this.user.email,
        (response) => {
          // Reset redirect
          this.$log(response)
          this.splashmessages.forgot = [{ text: 'You will receive an email with a reset link soon!', type: 'success' }]
        },
        (error) => {
          // Reset fail
          this.$log(error)
        })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~stylus/auth'

$side-block-width = 340px

#join
  text-align center
  #overlay
    pinned()
    gradient()
    content ''
    position fixed
    pointer-events none
    top $mobile-navigation-height
  .content-block--main
    radius(10px)
    margin 180px auto 50px auto
    max-width 340px
    @media(max-width: 980px)
      margin 100px auto 50px auto
    @media(max-width: 568px)
      margin 80px auto 50px auto
      max-width calc(100% - 40px)
      width calc(100% - 40px)
    
  .auth-form
    text-align left
    input
      border $color-border 1px solid
    h2
      reset()
      color $color-text-grey
      padding 10px
    p.consent-notice
      reset()
      color $color-text-grey
      padding 10px 10px 5px 10px
      a
        color darken($color-text-grey, 20%)
    .btn
      radius(26px)
      padding 0 30px
    a#facebook-badge
      radius(30px)
      background-color $color-facebook
      color white
      position absolute
      right 15px
      top 25px
      height 40px
      width 40px
      svg
        margin 10px
        height 20px
        width 20px
    p#forgot-link
      reset()
      color $color-text-grey
      font-size 0.9em
      padding-top 20px
      &:hover
        cursor pointer
        text-decoration underline
</style>
