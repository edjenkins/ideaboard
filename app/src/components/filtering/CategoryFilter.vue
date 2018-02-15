<template lang="pug">
  .category-wrapper
    ul#category-tabs
      router-link(tag="li" v-bind:to="{ name: 'explore' }") All Categories
      router-link(tag="li" v-for="(category, index) in categories" v-bind:key="index" v-bind:to="{ name: 'explore', params: { category: category.tag } }" v-bind:class="{ active: $route.params.category === category.tag }")
        | {{ category.name }}
      .clearfix
</template>

<script>
import API from '@/api'

export default {
  name: 'category-filter',
  mounted () {
    this.fetchCategories()
  },
  data () {
    return {
      categories: []
    }
  },
  methods: {
    fetchCategories () {
      API.category.fetchCategories(
        (response) => {
          // Idea success
          this.$log(response)
          this.categories = response.data
          this.$emit('update:categories', this.categories)
        },
        (error) => {
          // Idea fail
          this.$log(error)
        })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~stylus/shared'

.category-wrapper
  animate()
  pinned()
  bottom auto
  background-color white
  max-height $filter-height
  overflow hidden
  position absolute
  top 0
  pointer-events none
  z-index 1
  ul#category-tabs
    cleanlist()
    padding 0 10px
    li
      cleanlist()
      animate()
      radius(20px)
      color $color-text-grey
      float left
      line-height $filter-height - 26px
      margin (26px / 2) 2.5px
      padding 0 20px
      &:hover
        background-color alpha(black, 0.1)
        cursor pointer
      &.active
        background-color $color-primary
        color white

</style>
