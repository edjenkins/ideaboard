import axios from 'axios'
import * as config from '@/api/config'

export default {
  login (user, cb, errorCb) {
    axios.post(`${config.API_ADDRESS}/login`, user, { withCredentials: true }).then((response) => {
      cb(response)
    })
      .catch((error) => {
        errorCb(error)
      })
  },
  join (user, cb, errorCb) {
    axios.post(`${config.API_ADDRESS}/signup`, user, { withCredentials: true }).then((response) => {
      cb(response)
    })
      .catch((error) => {
        errorCb(error)
      })
  },
  status (cb, errorCb) {
    axios.get(`${config.API_ADDRESS}/auth/status`, { withCredentials: true }).then((response) => {
      cb(response)
    })
      .catch((error) => {
        errorCb(error)
      })
  },
  logout (cb, errorCb) {
    axios.get(`${config.API_ADDRESS}/logout`, { withCredentials: true }).then((response) => {
      cb(response)
    })
      .catch((error) => {
        errorCb(error)
      })
  },
  forgot (email, cb, errorCb) {
    axios.post(`${config.API_ADDRESS}/auth/forgot`, { email }, { withCredentials: true }).then((response) => {
      cb(response)
    })
      .catch((error) => {
        errorCb(error)
      })
  },
  reset (data, cb, errorCb) {
    axios.post(`${config.API_ADDRESS}/auth/reset`, data, { withCredentials: true }).then((response) => {
      cb(response)
    })
      .catch((error) => {
        errorCb(error)
      })
  },
  exists (data, cb, errorCb) {
    axios.post(`${config.API_ADDRESS}/auth/exists`, data, { withCredentials: true }).then((response) => {
      cb(response)
    })
      .catch((error) => {
        errorCb(error)
      })
  }
}
