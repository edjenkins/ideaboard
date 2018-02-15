import axios from 'axios'
import * as config from '@/api/config'

export default {
  fetch (cb, errorCb) {
    axios.get(`${config.API_ADDRESS}/notifications`, { withCredentials: true }).then((response) => {
      cb(response)
    })
      .catch((error) => {
        errorCb(error)
      })
  }
}
