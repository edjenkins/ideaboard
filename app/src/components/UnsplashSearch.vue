<template lang="pug">
.unsplash-search
  .input-wrapper
    input(type="text" v-model="searchQuery" placeholder="Tech, People, Cats etc." @keyup.enter="search()")
    .btn.btn-primary(@click="search")
      span(v-if="loading")
        | Wait...
      span(v-else)
        | Search
  ul.unsplash-search--results
    li.unsplash-search--results--result(v-for="(result, index) in results" v-bind:key="index" v-bind:class="{ active: (selectedImage && (selectedImage.id === result.id)) }" v-bind:style="{ 'background-image': `url(${result.urls.thumb})` }" @click="selectImage(result)")
      a.credit(v-bind:href="result.user.links.self" target="_blank") Credit - {{ result.user.first_name }} {{ result.user.last_name }}
    .clearfix

</template>

<script>
import API from '@/api'

export default {
  name: 'unsplash-search',
  data () {
    return {
      searchQuery: '',
      results: [],
      selectedImage: undefined,
      loading: false
    }
  },
  methods: {
    search () {
      this.loading = true
      API.unsplash.search(this.searchQuery,
        (response) => {
          this.$log(response)
          this.results = response.data
          this.loading = false
        },
        (error) => {
          this.$log(error)
          this.loading = false
        }
      )
    },
    selectImage (result) {
      this.selectedImage = result
      this.results = []
      this.$emit('update:selectedImage', this.selectedImage.urls.regular)
    }
  }
}
</script>

<style lang="stylus" scoped>

@import '~stylus/shared'

.unsplash-search
  .input-wrapper
    margin 20px 0 15px 0
    // max-width 360px
    padding 0
    padding-right 100px
    position relative
    input 
      box-sizing border-box
      max-width none
      width calc(100% - 15px)
    .btn
      pinned()
      line-height 47px
      position absolute
      left auto
      padding 0
      text-align center
      width 100px
      svg
        margin-left 8px
  ul.unsplash-search--results
    cleanlist()
    margin 0 -10px
    li.unsplash-search--results--result
      cleanlist()
      background-image($color-lightest-grey)
      float left
      height 0
      margin 10px
      margin-bottom 25px
      padding-bottom 20%
      position relative
      width calc(calc(100% / 3) - 20px)
      @media(max-width: 780px)
        width calc(calc(100% / 2) - 20px)
        padding-bottom 30%
      a.credit
        pinned()
        animate()
        opacity 0.2
        background-color white
        display block
        line-height 20px
        bottom -25px
        top auto
        color $color-text-grey
        font-size 0.8em
        position absolute
        text-decoration none
        text-align center
        white-space nowrap
        overflow hidden
        width 100%
      &:before
        center-align()
        radius(15px)
        animate()
        content 'Selected'
        background-color alpha(black, 0.7)
        color white
        height 30px
        overflow hidden
        text-align center
        width 80%
        line-height 30px
        max-width 110px
        opacity 0
        margin-top 20%
        position absolute
        pointer-events none
      &.active
        &:before
          opacity 1
          margin-top 0%
      &:hover
        cursor pointer
        a.credit
          opacity 1

</style>
