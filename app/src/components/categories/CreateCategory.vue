<template lang="pug">
  form
    .input-wrapper
      label Category name
      input(placeholder="E.g. Computer Science" type="text" name="name" v-model="newCategory.name")
    .input-wrapper
      label Category description
      input(placeholder="E.g. A collection of ideas to improve the field of computer science" type="text" name="description" v-model="newCategory.description")
    .input-wrapper
      label Category passcode (optional)
      input(placeholder="E.g. 0934" type="text" name="passcode" v-model="newCategory.passcode")
    .btn.btn-success.pull-right(@click="addCategory") Add Category
    .clearfix  
</template>

<script>
import API from '@/api'

export default {
  name: 'create-category',
  data () {
    return {
      newCategory: {
        name: undefined,
        description: undefined,
        passcode: undefined
      }
    }
  },
  methods: {
    slugify (str) {
      str = str.replace(/^\s+|\s+$/g, '') // trim
      str = str.toLowerCase()

      // remove accents, swap ñ for n, etc
      var from = 'àáäâèéëêìíïîòóöôùúüûñç·/_,:;'
      var to = 'aaaaeeeeiiiioooouuuunc------'
      for (var i = 0, l = from.length; i < l; i++) {
        str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i))
      }

      str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
      .replace(/\s+/g, '-') // collapse whitespace and replace by -
      .replace(/-+/g, '-') // collapse dashes

      return str
    },
    addCategory () {
      this.newCategory.tag = this.slugify(this.newCategory.name)
      API.category.addCategory(this.newCategory,
        (response) => {
          this.$log(response)
          for (const key in this.newCategory) {
            this.newCategory[key] = undefined
          }
          // Reload categories
          this.$emit('createdCategory')
        },
        (error) => {
          // Add category failed
          this.$log(error)
          alert('Something went wrong')
        })
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
