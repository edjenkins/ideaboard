<template lang="pug">
.tab-content--categories
  h1.tab--header.no-parent
    | Categories
    .tab--header--action Refresh

  .tab--content
    p(v-if="categories.length === 0") No categories created
    .categories-wrapper(v-else)
      ul
        li(v-for="(category, index) in categories" v-bind:key="index")
          router-link(v-bind:to="{ name: 'explore', params: { category: category.tag } }") {{ category.name }}
</template>

<script>
export default {
  name: 'categories-tab',
  props: ['currentUser'],
  data () {
    return {
      categories: [
        {
          name: 'Computer Science',
          tag: 'computer-science',
          passcode: 'CS12'
        },
        {
          name: 'Open Lab',
          tag: 'open-lab',
          passcode: undefined
        }
      ]
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

</style>
