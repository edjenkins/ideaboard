import config from '@/config'

const videojs = require('video.js')

export default {
  mounted () {
    const videos = document.getElementsByClassName('video-js')
    for (var i = 0; i < videos.length; i++) {
      videojs(videos[i]).ready(function () { })
    }
  },
  methods: {
    getLocation (location, type) {
      location = location.replace(`${location.substr(0, location.lastIndexOf('/'))}`, `${config.cdn2}/encoded`)
      location = `${location.substr(0, location.lastIndexOf('.'))}.${type}`
      return location
    },
    getThumbnail (location) {
      location = location.replace(`${location.substr(0, location.lastIndexOf('/'))}`, `${config.cdn2}/encoded`)
      location = `${location.substr(0, location.lastIndexOf('.'))}-00001.png`
      return location
    }
  }
}
