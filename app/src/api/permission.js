import axios from 'axios'
import * as config from '@/api/config'

export default {
  fetch (cb, errorCb) {
    axios.get(`${config.API_ADDRESS}/permissions`, { withCredentials: true }).then((response) => {
      cb(response)
    })
      .catch((error) => {
        errorCb(error)
      })
  },
  update (userId, permissions, cb, errorCb) {
    axios.put(`${config.API_ADDRESS}/permissions`, { userId: userId, permissions: permissions }, { withCredentials: true }).then((response) => {
      cb(response)
    })
      .catch((error) => {
        errorCb(error)
      })
  }
}
