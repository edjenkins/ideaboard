<template lang="pug">
  .category-selector
    dropdown(ref="dropdown" v-bind:class-name="'custom'")
      template(slot="btn") {{ category_name || 'No Category' }}
      //- Select Category
      template(slot="body")
        .category(@click="selectCategory(undefined)")
          label No Category
        .category(slot="body" v-for="(category, index) in categories" @click="selectCategory(category)")
          label {{ category.name }}

</template>

<script>
import Dropdown from 'bp-vuejs-dropdown'

export default {
  name: 'category-selector',
  props: [ 'category', 'category_name', 'categories' ],
  components: {
    Dropdown
  },
  methods: {
    selectCategory (category) {
      this.$emit('update:category', (typeof category === 'undefined') ? undefined : category._id)
      this.$emit('update:category_name', (typeof category === 'undefined') ? 'No Category' : category.name)
      this.$refs.dropdown.isHidden = true
    }
  }
}
</script>

<style lang="stylus">

@import '~stylus/shared'

.custom-bp__btn
  border $color-border 1px solid !important
  padding 8px 15px !important

.custom-bp__body
  padding 0 !important
  .category label
    padding 8px 15px
    &:hover
      background-color $color-lightest-grey
      cursor pointer

</style>
