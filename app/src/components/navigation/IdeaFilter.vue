<template lang="pug">
  #idea-filter(v-bind:class="{ categories: categoriesVisible, search: categories.length > 0 ? searchVisible : true, searchOnly: categories.length === 0 }")
    .row
      .content-block.pull-up.white-block

        .sort-wrapper(v-show="categories.length > 0")
          ul#sort-tabs
            li.category-dropdown(@click="toggleCategories()" v-bind:class="{ 'has-categories': categories.length > 0 }")
              | {{ currentCategory ? currentCategory.name : '' }}
              i.fas.fa-angle-down
              
            //- li(@click="toggleSortType()") {{ sortType }}
          #search(v-bind:class="{ active: searchVisible }" @click="toggleSearch()")
            i.fas.fa-search
          .clearfix

        category-filter(v-bind:categories.sync="categories" v-show="categories.length > 0")

        .search-wrapper
          input(ref="search" v-model="searchQuery" type="text" placeholder="What are you looking for?")

        .clearfix

</template>

<script>
import CategoryFilter from '@/components/filtering/CategoryFilter'

import _find from 'lodash/find'

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
    toggleSearch (to) {
      this.searchQuery = '' // Reset search query
      this.searchVisible = to || !this.searchVisible // Toggle search
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
          svg
            position absolute
            top 9px
            right 10px
          &.category-dropdown
            pointer-events none
            svg
              display none
            &.has-categories
              pointer-events all
              svg
                display block
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
        padding 0
        width $filter-height - 26px
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
  &.searchOnly
    height $filter-height
    .search-wrapper
      top 0 !important
    
</style>
