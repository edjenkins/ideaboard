import axios from 'axios'
import * as config from '@/api/config'

export default {
  fetchDocuments (id, cb, errorCb) {
    axios.get(`${config.API_ADDRESS}/documents/${id}`, { withCredentials: true }).then((response) => {
      cb(response)
    })
      .catch((error) => {
        errorCb(error)
      })
  },
  update (body, cb, errorCb) {
    axios.post(`${config.API_ADDRESS}/document`, body, { withCredentials: true }).then((response) => {
      cb(response)
    })
      .catch((error) => {
        errorCb(error)
      })
  }
}
