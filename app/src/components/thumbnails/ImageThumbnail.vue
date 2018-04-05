<template lang="pug">

.image-thumbnail(@click="toggle()")
  .svg(v-if="isSvg")
    img(v-bind:src="file.location")

  .jpg(v-else v-bind:style="thumbnailStyles")

</template>

<script>
export default {
  name: 'image-thumbnail',
  props: ['file'],
  data () {
    return {
      isExpanded: false,
      isExpanding: false
    }
  },
  methods: {
    toggle () {
      if (this.isExpanded) {
        this.isExpanding = false
      } else {
        this.isExpanding = true
      }
      setTimeout(() => {
        this.isExpanded = !this.isExpanded
        this.isExpanding = false
      }, 300)
    }
  },
  computed: {
    isSvg () {
      return this.file.mimetype === 'image/svg+xml'
    },
    thumbnailStyles () {
      // Resize
      let styles = [this.$options.filters.background(this.$options.filters.resize(this.file.location, '800'))]
      if (typeof this.file.dimensions !== 'undefined' && this.isExpanded) {
        const aspectRatio = (this.file.dimensions.height / this.file.dimensions.width)
        styles.push({
          'padding-bottom': `${aspectRatio * 100}%`
        })
      }
      return styles
    }
  }
}
</script>

<style lang="stylus" scoped>

@import '~stylus/shared'

.image-thumbnail
  .jpg, .svg
    animate()
    background-image($color-lightest-grey)
    background-position left
    background-size cover
    height 0
    padding-bottom 30%
    overflow hidden
    width 100%
    &:hover
      cursor pointer
      opacity 0.9
</style>
