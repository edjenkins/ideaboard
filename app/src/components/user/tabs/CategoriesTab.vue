<template lang="pug">
.tab-content--categories

  h1.tab--header.no-parent
    .tab--header--title Manage
    .tab--header--action(@click="viewCategories")
      i.fas(v-bind:class="[viewingCategories ? 'fa-angle-up' : 'fa-angle-down']")

  .tab--content(v-if="viewingCategories")

    p(v-if="categories.length === 0") No categories created

    .categories-wrapper(v-else)
      router-link.category-tile(tag="div" v-for="(category, index) in categories" v-bind:key="index" v-bind:to="{ name: 'explore', params: { category: category.tag } }")
        .category-name Name: {{ category.name }}
        .category-tag Tag: {{ category.tag }}

  h1.tab--header.no-parent
    .tab--header--title Add new
    .tab--header--action(@click="addCategory")
      i.fas(v-bind:class="[addingCategory ? 'fa-angle-up' : 'fa-angle-down']")

  .tab--content(v-if="addingCategory")
    .tab-section--body
      create-category(v-on:createdCategory="categoryCreated")
    
</template>

<script>
import API from '@/api'

import CreateCategory from '@/components/categories/CreateCategory'

export default {
  name: 'categories-tab',
  props: ['currentUser'],
  components: {
    CreateCategory
  },
  created () {
    this.fetchCategories()
  },
  data () {
    return {
      categories: [],
      addingCategory: true,
      viewingCategories: false
    }
  },
  methods: {
    categoryCreated () {
      this.viewingCategories = true
      this.addingCategory = false
      this.fetchCategories()
    },
    viewCategories () {
      this.viewingCategories = !this.viewingCategories
    },
    addCategory () {
      this.addingCategory = !this.addingCategory
    },
    fetchCategories () {
      API.category.fetchCategories(
        (response) => {
          // Idea success
          this.$log(response)
          this.categories = response.data
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

.tab-content--categories
  text-align left
  .tab--content
    padding 25px  
    p
      reset()
    .categories-wrapper
      .category-tile
        animate()
        background-color $color-lightest-grey
        display block
        margin-bottom 10px
        padding 20px
        text-decoration none
        .category-name
          color $color-text-darkest-grey
          text-decoration none
        .category-tag
          color $color-text-grey
          text-decoration none
        &:hover
          background-color darken($color-lightest-grey, 5%)
          cursor pointer

</style>
