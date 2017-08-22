import axios from 'axios'
import * as config from '@/api/config'

export default {
  upload (formData, cb, errorCb) {
    axios.post(`${config.API_ADDRESS}/upload`, formData, { withCredentials: true }).then((response) => {
      cb(response)
    })
    .catch((error) => {
      errorCb(error)
    })
  }
}
