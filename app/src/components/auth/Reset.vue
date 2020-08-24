<template lang="pug">
  #reset
    page-header(title="Reset Password" subtitle="Reset your password here")
    .row
      .content-block.content-block--main.pull-up.white-block
        .auth-form
        
          .content-block--body
            h2 Reset
            form(v-on:submit.prevent="reset")
              //- .input-wrapper
                //- label Reset code
              input(disabled v-model="code" name="code" placeholder="Your code" type="hidden")
              .input-wrapper
                label Your new password
                input(v-model="password" name="password" placeholder="Your new password" type="password")
          .content-block--footer
            .btn.btn-success.pull-right(@click="reset") {{ (isAuthenticating) ? 'Please wait..' : 'Reset Password' }}
            .clearfix
          
      .clearfix

</template>

<script>
import API from '@/api'
import { mapGetters } from 'vuex'
import PageHeader from '@/components/PageHeader'

export default {
  name: 'reset',
  metaInfo: {
    title: 'Reset'
  },
  props: ['code'],
  components: {
    PageHeader
  },
  data () {
    return {
      isAuthenticating: false,
      state: 'login',
      password: ''
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
    reset () {
      if (this.isAuthenticating) return
      this.isAuthenticating = true
      API.auth.reset({ code: this.code, password: this.password },
        (response) => {
          // Reset redirect
          this.$log(response)
          this.$router.push('/auth')
        },
        (error) => {
          // Reset fail
          this.$log(error)
          this.isAuthenticating = false
        })
    }
  }
}
</script>

<style lang="stylus" scoped>

@import '~stylus/shared'

#reset
  background-color $color-lighter-grey
  text-align center
  .content-block--main
    margin-bottom 30px
    width calc(100% - 360px)
    @media(max-width: 680px)
      margin-top -10px
      width 100%

  .auth-panel
    border-left $color-border 1px solid
    border-right $color-border 1px solid
    box-sizing border-box
    margin 0 auto
    padding 20px
    text-align left

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
