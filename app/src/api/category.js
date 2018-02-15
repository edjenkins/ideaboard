import axios from 'axios'
import * as config from '@/api/config'

export default {
  addCategory (category, cb, errorCb) {
    axios.post(`${config.API_ADDRESS}/category`, { category: category }, { withCredentials: true }).then((response) => {
      cb(response)
    })
      .catch((error) => {
        errorCb(error)
      })
  },
  fetchCategories (cb, errorCb) {
    axios.get(`${config.API_ADDRESS}/categories`, { withCredentials: true }).then((response) => {
      cb(response)
    })
      .catch((error) => {
        errorCb(error)
      })
  }
  // update(idea, cb, errorCb) {
  //   axios.put(`${config.API_ADDRESS}/idea`, idea, { withCredentials: true }).then((response) => {
  //     cb(response)
  //   })
  //     .catch((error) => {
  //       errorCb(error)
  //     })
  // }
}
