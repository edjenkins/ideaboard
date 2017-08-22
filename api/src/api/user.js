import axios from 'axios'
import * as config from '@/api/config'

export default {
  fetch (id, cb, errorCb) {
    axios.get(`${config.API_ADDRESS}/user/${id}`, { withCredentials: true }).then((response) => {
      cb(response)
    })
      .catch((error) => {
        errorCb(error)
      })
  },
  update (user, cb, errorCb) {
    axios.put(`${config.API_ADDRESS}/user`, user, { withCredentials: true }).then((response) => {
      cb(response)
    })
      .catch((error) => {
        errorCb(error)
      })
  },
  ideas (id, cb, errorCb) {
    axios.get(`${config.API_ADDRESS}/user/${id}/ideas`, { withCredentials: true }).then((response) => {
      cb(response)
    })
      .catch((error) => {
        errorCb(error)
      })
  }
}
