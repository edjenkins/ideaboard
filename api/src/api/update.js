import axios from 'axios'
import * as config from '@/api/config'

export default {
  post (ideaId, update, cb, errorCb) {
    axios.post(`${config.API_ADDRESS}/idea/${ideaId}/update`, update, { withCredentials: true }).then((response) => {
      cb(response)
    })
      .catch((error) => {
        errorCb(error)
      })
  },
  fetch (ideaId, cb, errorCb) {
    axios.get(`${config.API_ADDRESS}/idea/${ideaId}/updates`, { withCredentials: true }).then((response) => {
      cb(response)
    })
      .catch((error) => {
        errorCb(error)
      })
  }
}
