import axios from 'axios'
import * as config from '@/api/config'

export default {
  fetch (data, cb, errorCb) {
    axios.get(`${config.API_ADDRESS}/comments/${data.type}/${data.target}`, data, { withCredentials: true }).then((response) => {
      cb(response)
    })
      .catch((error) => {
        errorCb(error)
      })
  },
  post (postData, cb, errorCb) {
    axios.post(`${config.API_ADDRESS}/comment`, postData, { withCredentials: true }).then((response) => {
      cb(response)
    })
      .catch((error) => {
        errorCb(error)
      })
  },
  destroy (postData, cb, errorCb) {
    axios.post(`${config.API_ADDRESS}/comment/destroy`, postData, { withCredentials: true }).then((response) => {
      cb(response)
    })
      .catch((error) => {
        errorCb(error)
      })
  }
}
