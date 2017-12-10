<template lang="pug">
  #idea-filter(v-bind:class="{ categories: categoriesVisible, search: searchVisible }")
    .row
      .content-block.pull-up.white-block

        .sort-wrapper
          ul#sort-tabs
            li(@click="toggleCategories()")
              | {{ currentCategory.name }}
              icon(name="angle-down")
            //- li(@click="toggleSortType()") {{ sortType }}
          #search(v-bind:class="{ active: searchVisible }" @click="toggleSearch()") {{ searchVisible ? 'Cancel' : 'Search' }}
          .clearfix

        .category-wrapper
          ul#category-tabs
            router-link(tag="li" v-for="(category, index) in categories" v-bind:key="index" v-bind:to="{ name: 'explore', params: { category: category.tag } }" v-bind:class="{ active: $route.params.category === category.tag }")
              | {{ category.name }}
            .clearfix

        .search-wrapper
          input(ref="search" v-model="searchQuery" type="text" placeholder="Search Ideas...")

        .clearfix
</template>

<script>
import _find from 'lodash/find'

import 'vue-awesome/icons/angle-down'

export default {
  name: 'idea-filter',
  props: ['sortType'],
  data () {
    return {
      categoriesVisible: false,
      searchVisible: false,
      searchQuery: '',
      sortTypeIndex: 0,
      sortTypes: ['Recent', 'Popular'],
      categories: [
        { name: 'All Categories', tag: undefined },
        { name: 'Computer Science', tag: 'computer-science' },
        { name: 'Design', tag: 'design' },
        { name: 'Programming', tag: 'programming' },
        { name: 'Management', tag: 'management' }
      ]
    }
  },
  watch: {
    '$route.params.category': {
      handler: function (nV, oV) {
        if (nV === oV) return
        setTimeout(() => {
          this.categoriesVisible = false
        }, 500)
      },
      deep: true
    },
    searchQuery (nV) {
      this.updateSearchQuery(nV)
    }
  },
  computed: {
    currentCategory () {
      return _find(this.categories, { tag: this.$route.params.category })
    }
  },
  methods: {
    toggleCategories () {
      this.categoriesVisible = !this.categoriesVisible
      this.searchVisible = this.categoriesVisible ? false : this.searchVisible
    },
    toggleSearch () {
      this.searchQuery = '' // Reset search query
      this.searchVisible = !this.searchVisible // Toggle search
      this.categoriesVisible = this.searchVisible ? false : this.categoriesVisible
      this.$refs.search.focus()
    },
    toggleSortType () {
      // Hide filters
      this.categoriesVisible = false
      this.searchVisible = false

      this.sortTypeIndex = this.sortTypeIndex + 1
      this.sortTypeIndex = (this.sortTypeIndex > (this.sortTypes.length - 1)) ? 0 : this.sortTypeIndex
      this.$emit('update:sortType', this.sortTypes[this.sortTypeIndex])
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
          height $filter-height - 26px
          margin (26px / 2) 2.5px
          min-width 60px
          overflow hidden
          padding 0 28px 0 15px
          position relative
          text-align center
          .fa-icon
            position absolute
            top 9px
            right 10px
          @media(max-width: 568px)
            max-width 180px
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
        padding 0 15px
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
      max-height 400px
      pointer-events all
  &.search
    .search-wrapper
      top $filter-height
      pointer-events all
</style>
