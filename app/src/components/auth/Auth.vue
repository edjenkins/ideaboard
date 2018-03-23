<template lang="pug">
  #join(v-bind:style="[instanceBackground]" v-bind:class="{ join: (state === 'join') }")
    //- page-header(title="Get Started" subtitle="Create an account or login to subscribe to ideas and engage in discussions")
    .row
      .content-block.content-block--main.white-block

        .auth-form(v-if="state === 'join'")

          .content-block--body
            h2 Get Started
            a#facebook-badge(v-bind:href="oAuthLink('facebook')" target="_self")
              i.fab.fa-facebook

            form
              splash-messages(v-bind:messages="splashmessages['join']")
              .input-wrapper
                label Name
                input(v-model="user.name" v-bind:disabled="isAuthenticating" name="name" placeholder="Your name")
              .input-wrapper
                label Email
                input(v-model="user.email" v-bind:disabled="isAuthenticating" name="email" type="email" placeholder="Your email")
              .input-wrapper
                label Password
                input(v-model="user.password" v-bind:disabled="isAuthenticating" name="password" type="password" placeholder="Your password" v-on:keydown.enter="join")
                p#forgot-link(@click="state = 'forgot'") Forgot your password?


          .content-block--footer
            p#terms-notice By continuing you agree with our #[router-link(v-bind:to="{ name: 'terms' }") terms and conditions.]
            .btn.btn-success.pull-right(@click="join") {{ isAuthenticating ? 'Checking...' : 'Continue' }}
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
      
    //- site-footer

</template>

<script>
import API from '@/api'
import { mapGetters } from 'vuex'

import AuthMixin from '@/mixins/AuthMixin'

import PageHeader from '@/components/PageHeader'
import SiteFooter from '@/components/navigation/SiteFooter'
import SplashMessages from '@/components/shared/SplashMessages'

import * as config from '@/api/config'

console.log(config)
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
    SiteFooter,
    SplashMessages
  },
  data () {
    return {
      isAuthenticating: false,
      state: 'join',
      user: {
        name: config.ADMIN_NAME,
        email: config.ADMIN_EMAIL,
        password: config.ADMIN_PASSWORD
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
    ])
  },
  watch: {
    isAuthenticated (nV) {
      if (nV) {
        this.$router.push('/profile')
      }
    }
  },
  methods: {
    join () {
      if (this.isAuthenticating) return
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
  pinned()
  gradient()
  top $mobile-navigation-height
  background-color $color-lighter-grey
  position absolute
  text-align center
  .content-block--main
    radius(10px)
    margin 40px auto 50px auto
    max-width 340px
    @media(max-width: 568px)
      margin 20px auto 50px auto
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
    p#terms-notice
      reset()
      color $color-text-grey
      padding 10px
      padding-bottom 20px
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
