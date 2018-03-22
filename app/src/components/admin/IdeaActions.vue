<template lang="pug">
#idea-actions
  dropdown(ref="dropdown" v-bind:class-name="'custom'")
    template(slot="btn") Select action
    template(slot="body")
      .action
        label(@click="destroyIdea") Destroy Idea
</template>

<script>
import API from '@/api'
import Dropdown from 'bp-vuejs-dropdown'

export default {
  name: 'idea-actions',
  props: ['idea'],
  components: {
    Dropdown
  },
  methods: {
    destroyIdea () {
      this.$refs.dropdown.isHidden = true
      API.idea.destroy(this.$route.params.id,
        (response) => {
          // Destroyed
          this.$log(response)
          this.$router.push({ name: 'explore' })
        },
        (error) => {
          // Failed to destroy
          this.$log(error)
        })
    }
  }
}
</script>

<style lang="stylus">

@import '~stylus/shared'

#idea-actions
  padding-bottom 20px
  .custom-bp__btn
    display block
    padding 10px
    text-align center
  .custom-bp__body
    border-box()
    padding 0
    .action
      padding 10px
      &:hover
        cursor pointer
        background-color $color-lightest-grey
</style>
