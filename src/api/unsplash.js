import axios from 'axios'
import * as config from '@/api/config'

export default {
  search (query, cb, errorCb) {
    axios.get(`${config.API_ADDRESS}/unsplash/search/${query}`, { withCredentials: true }).then((response) => {
      cb(response)
    })
      .catch((error) => {
        errorCb(error)
      })
  }
}
