import { mapGetters } from 'vuex'

import FeaturedIdeas from '@/components/ideas/FeaturedIdeas'
import Showcase from '@/components/home/Showcase'
import SplashImage from '@/components/home/SplashImage'

import PageHeader from '@/components/PageHeader'
import SiteFooter from '@/components/navigation/SiteFooter'

export default {
  metaInfo: {
    title: 'Home'
  },
  components: {
    FeaturedIdeas,
    Showcase,
    SplashImage,
    PageHeader,
    SiteFooter
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
    ...mapGetters(['navColor'])
  }
}
