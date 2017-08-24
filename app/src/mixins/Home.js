import { mapGetters } from 'vuex'

import PageHeader from '@/components/PageHeader'
import SiteFooter from '@/components/navigation/SiteFooter'

export default {
  components: {
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
