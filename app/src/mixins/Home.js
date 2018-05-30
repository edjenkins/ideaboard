import { mapGetters } from 'vuex'

import FeaturedIdeas from '@/components/ideas/FeaturedIdeas'
import Showcase from '@/components/home/Showcase'
import SplashImage from '@/components/home/SplashImage'

import Collaborate from '@/components/home/Collaborate'
import Ready from '@/components/home/Ready'

import PageHeader from '@/components/PageHeader'

export default {
  metaInfo: {
    title: 'Home'
  },
  components: {
    FeaturedIdeas,
    Showcase,
    SplashImage,
    Collaborate,
    Ready,
    PageHeader
  },
  created () {
    setInterval(() => {
      this.exampleIndex = (this.exampleIndex === this.examples.length - 1) ? 0 : this.exampleIndex + 1
    }, 2000)
  },
  data () {
    return {
      exampleIndex: 0,
      examples: ['events', 'courses', 'products', 'protests', 'services', 'meetups']
    }
  },
  computed: {
    ...mapGetters(['instanceBackground'])
  }
}
