<template lang="pug">
  #idea-filter(v-bind:class="{ categories: categoriesVisible, search: searchVisible }")
    .row
      .content-block.pull-up.white-block

        .sort-wrapper
          ul#sort-tabs
            li(v-bind:class="{ active: (sortType === 'recent') }" @click="updateSortType('recent')") Recent
            li(v-bind:class="{ active: (sortType === 'popular') }" @click="updateSortType('popular')") Popular
            //- li(v-bind:class="{ active: categoriesVisible }" @click="toggleCategories()") Categories
          #search(v-bind:class="{ active: searchVisible }" @click="toggleSearch()") {{ searchVisible ? 'Cancel' : 'Search' }}
          .clearfix

        //- .category-wrapper
          ul#category-tabs
            li.active All
            li Design
            li Programming
            li Management
            .clearfix

        .search-wrapper
          input(v-model="searchQuery" type="text" placeholder="Search Ideas..." autofocus)

        .clearfix
</template>

<script>
export default {
  name: 'idea-filter',
  props: ['sortType'],
  data () {
    return {
      categoriesVisible: false,
      searchVisible: false,
      searchQuery: ''
    }
  },
  watch: {
    searchQuery (nV) {
      this.updateSearchQuery(nV)
    }
  },
  methods: {
    toggleCategories () {
      this.categoriesVisible = !this.categoriesVisible
    },
    toggleSearch () {
      this.searchQuery = '' // Reset search query
      this.searchVisible = !this.searchVisible // Toggle search
    },
    updateSortType (newSortType) {
      this.$emit('update:sortType', newSortType)
    },
    updateSearchQuery (newSearchQuery) {
      this.$emit('update:searchQuery', newSearchQuery)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~stylus/shared'

$filter-height = 60px

#idea-filter
  animate()
  box-sizing border-box
  height $filter-height
  .content-block
    .sort-wrapper
      animate()
      background-color white
      border-bottom transparent 1px solid
      position relative
      z-index 2

      ul#sort-tabs
        cleanlist()
        float left
        padding 0 10px
        position relative
        li
          cleanlist()
          animate()
          radius(20px)
          color $color-text-grey
          float left
          line-height $filter-height - 26px
          margin (26px / 2) 5px
          padding 0 20px
          &:hover
            background-color alpha(black, 0.1)
            cursor pointer
          &.active
            background-color $color-primary
            color white
      #search
        animate()
        radius(20px)
        color $color-text-grey
        float right
        line-height $filter-height - 26px
        margin (26px / 2) 15px
        padding 0 20px
        &:hover
          background-color alpha(black, 0.1)
          cursor pointer
        &.active
          background-color $color-primary
          color white

    .category-wrapper
      animate()
      pinned()
      bottom auto
      background-color white
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
          margin (26px / 2) 5px
          padding 0 20px
          &:hover
            background-color alpha(black, 0.1)
            cursor pointer
          &.active
            background-color $color-primary
            color white

    .search-wrapper
      animate()
      pinned()
      bottom auto
      background-color white
      height $filter-height
      position absolute
      top 0
      pointer-events none
      text-align right
      z-index 1
      input
        border-box()
        border none
        font-size 1em
        height $filter-height
        outline 0
        padding 0 20px
        width 100%

  &.categories, &.search
    height $filter-height * 2
    .sort-wrapper
      border-bottom-color $color-border
  
  &.categories
    .category-wrapper
      top $filter-height
      pointer-events all
  &.search
    .search-wrapper
      top $filter-height
      pointer-events all
</style>
