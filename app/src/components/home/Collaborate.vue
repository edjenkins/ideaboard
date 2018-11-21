<template lang="pug">
 .row-wrapper#collaborate(v-bind:style="[styles || instanceBackground]")
  .row
    .content-block
      .collaborate
        .collaborate--image(v-bind:id="align == 'left'? 'left' : 'right'")
          img(src="https://ideaboard.co.uk/static/images/illustrations/design.svg")
        .collaborate--content(v-bind:id="align == 'left'? 'left' : 'right'")
          h2(v-bind:class="{'dark': theme==='dark'}") {{ title }}
          p(v-bind:class="{'dark': theme==='dark'}") {{ subtitle }}
          router-link.collaborate--action(v-if="!clickaction" v-bind:to="link" v-bind:class="{'dark': theme==='dark'}") {{ action }}
          a.collaborate--action(v-if="clickaction" v-bind:class="{'dark': theme==='dark'}" v-on:click="clickaction") {{ action }}
        
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'collaborate',
  props: ['title', 'subtitle', 'action', 'link', 'styles', 'align', 'theme', 'clickaction'],
  computed: {
    ...mapGetters(['instanceBackground'])
  }
}
</script>

<style lang="stylus" scoped>

@import '~stylus/home'

.row-wrapper
  gradient()
  background-color $color-primary
  position relative
.collaborate
  padding 80px 0px !important
  position relative
  width 100%
  .collaborate--image
    position absolute
    text-align center
    width 50%
    img
      height 320px
      max-width 100%
    &#left
      margin-left 50%
    &#right
      margin-right 50%

  .collaborate--content
    padding 50px 30px
    text-align center
    &#left
      margin-right 50%
    &#right
      margin-left 50%    
    h2
      reset()
      color white
      &.dark
        color #444
      font-size 2em
    p
      reset()
      color white
      &.dark
        color #444
      font-size 1.2em
      margin 20px auto 30px auto
    .collaborate--action
      animate()
      radius(30px)
      background-color alpha(black, 0.05)
      color white
      &.dark
        color #444
      display inline-block
      font-weight bold
      line-height 60px
      margin 0 20px
      padding 0 30px
      text-align center
      text-decoration none
      &:hover
        cursor pointer
        background-color alpha(black, 0.1)

  @media(max-width: 640px)
    padding 0 !important
    .collaborate--image
      margin 40px auto 20px auto
      position relative
      text-align center
      max-width calc(100% - 120px)
      width 100%
      img
        height auto
      &#left
        margin-right auto !important
        margin-left auto !important
      &#right
        margin-right auto !important
        margin-left auto !important   
    .collaborate--content
      margin-right auto !important
      margin-left auto !important
</style>
