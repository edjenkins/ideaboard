<template lang="pug">
  #join(:class="{ login: (state === 'login'), join: (state === 'join') }")
    page-header(title="Get Started" subtitle="Create an account or login to subscribe to ideas and engage in discussions")
    .row
      .content-block.content-block--side.pull-up.pull-left.white-block
        .content-block--body.auth-panel
          a.oauth-button#facebook(href="https://api.eventspark.co.uk/auth/facebook/login" target="_self") Continue with Facebook
          .oauth-button.minimal.split(@click="state = 'join'" v-bind:class="{ active: (state === 'join') }") Sign Up
          .oauth-button.minimal.split(@click="state = 'login'" v-bind:class="{ active: (state === 'login') }") Login
          .clearfix
      .content-block.content-block--main.pull-up.pull-right.white-block
        .auth-form(v-if="state === 'login'")
        
          .content-block--body
            h2 Login
            form
              .input-wrapper
                label Your email
                input(v-model="user.email" name="email" placeholder="Your email")
              .input-wrapper
                label Your password
                input(v-model="user.password" name="password" placeholder="Your password")
                p#forgot-link(@click="state = 'forgot'") Forgot your password?
          .content-block--footer
            .btn.btn-success.pull-right(@click="login") {{ (isAuthenticating) ? 'Please wait..' : 'Login' }}
            .clearfix
          
        .auth-form(v-if="state === 'join'")
        
          .content-block--body
            h2 Create Account
            form
              .input-wrapper
                label Your name
                input(v-model="user.name" name="name" placeholder="Your name")
              .input-wrapper
                label Your email
                input(v-model="user.email" name="email" placeholder="Your email")
              .input-wrapper
                label Create a password
                input(v-model="user.password" name="password" placeholder="Create a password")
          .content-block--footer
            .btn.btn-success.pull-right(@click="join") {{ (isAuthenticating) ? 'Creating account..' : 'Create Account' }}
            .clearfix
          
        .auth-form(v-if="state === 'forgot'")
        
          .content-block--body
            h2 Forgot Password
            form
              .input-wrapper
                label Your email
                input(v-model="user.email" name="email" placeholder="Your email")
          .content-block--footer
            .btn.btn-success.pull-right(@click="forgotPassword") Continue
            .clearfix

      .clearfix

</template>

<script>
import API from '@/api'
import { mapGetters } from 'vuex'
import PageHeader from '@/components/PageHeader'

export default {
  name: 'join',
  metaInfo: {
    title: 'Join'
  },
  components: {
    PageHeader
  },
  data () {
    return {
      isAuthenticating: false,
      state: 'login',
      user: {
        name: '',
        email: '',
        password: ''
      }
    }
  },
  computed: {
    ...mapGetters([
      'isAuthenticated'
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
      API.auth.join(this.user,
        (response) => {
          // Join redirect
          this.$log(response)
          this.$store.dispatch('checkAuthStatus')
          setTimeout(() => { this.isAuthenticating = false }, 500)
        },
        (error) => {
          // Join fail
          this.$log(error)
          this.isAuthenticating = false
        })
    },
    login () {
      if (this.isAuthenticating) return
      this.isAuthenticating = true
      API.auth.login(this.user,
        (response) => {
          // Login redirect
          this.$log(response)
          this.$store.dispatch('checkAuthStatus')
          setTimeout(() => { this.isAuthenticating = false }, 500)
        },
        (error) => {
          // Login fail
          this.$log(error)
          this.isAuthenticating = false
        })
    },
    forgotPassword () {
      API.auth.forgot(this.user.email,
        (response) => {
          // Reset redirect
          this.$log(response)
          alert('You will receive an email shortly')
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
  background-color $color-lighter-grey
  text-align center
  .content-block--main
    margin-bottom 30px
    width calc(100% - 360px)
    @media(max-width: 680px)
      margin-top -10px
      width 100%

  .content-block--side
    margin-bottom 30px
    width $side-block-width
    @media(max-width: 680px)
      width 100%
    .content-block--footer
      padding 0
    
  .auth-form
    text-align left
    h2
      reset()
      color $text-grey
      padding 10px
    p#forgot-link
      color $color-text-grey
      font-size 0.9em
      padding 10px 0
      text-decoration underline
</style>
