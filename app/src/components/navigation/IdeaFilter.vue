<template lang="pug">
  #idea-filter(v-bind:class="{ categories: categoriesVisible, search: searchVisible }")
    .row
      .content-block.pull-up.white-block

        .sort-wrapper
          ul#sort-tabs
            li(@click="toggleCategories()")
              | {{ currentCategory ? currentCategory.name : '' }}
              icon(name="angle-down")
            //- li(@click="toggleSortType()") {{ sortType }}
          #search(v-bind:class="{ active: searchVisible }" @click="toggleSearch()") {{ searchVisible ? 'Cancel' : 'Search' }}
          .clearfix

        category-filter(v-bind:categories.sync="categories")

        .search-wrapper
          input(ref="search" v-model="searchQuery" type="text" placeholder="Search Ideas...")

        .clearfix

</template>

<script>
import CategoryFilter from '@/components/filtering/CategoryFilter'

import _find from 'lodash/find'

import 'vue-awesome/icons/angle-down'

export default {
  name: 'idea-filter',
  props: ['sortType'],
  components: {
    CategoryFilter
  },
  data () {
    return {
      categoriesVisible: false,
      searchVisible: false,
      searchQuery: '',
      sortTypeIndex: 0,
      sortTypes: ['Recent', 'Popular'],
      categories: []
    }
  },
  watch: {
    '$route.params.category': {
      handler: function (nV, oV) {
        if (nV === oV) return
        setTimeout(() => {
          this.categoriesVisible = false
        }, 300)
      },
      deep: true
    },
    searchQuery (nV) {
      this.updateSearchQuery(nV)
    },
    currentCategory (nV) {
      // if (nV && nV.passcode && nV.passcode.length > 0) {
      //   alert(`Passcode required "${nV.passcode}"`)
      // }
      this.$emit('update:currentCategory', nV)
      this.$emit('reload')
    }
  },
  computed: {
    currentCategory () {
      // Attempt to find a category from the current URL param
      const category = _find(this.categories, { tag: this.$route.params.category })
      return (typeof category !== 'undefined') ? category : { name: 'All Categories', tag: undefined }
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
      this.$emit('reload')
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~stylus/shared'

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
