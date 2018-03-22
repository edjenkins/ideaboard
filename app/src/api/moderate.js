import axios from 'axios'
import * as config from '@/api/config'

export default {
  report (body, cb, errorCb) {
    axios.post(`${config.API_ADDRESS}/moderate/report`, body, { withCredentials: true }).then((response) => {
      cb(response)
    })
      .catch((error) => {
        errorCb(error)
      })
  }
}
