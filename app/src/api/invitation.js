import axios from 'axios'
import * as config from '@/api/config'

export default {
  send (recipient, cb, errorCb) {
    axios.post(`${config.API_ADDRESS}/invitation`, { recipient }, { withCredentials: true }).then((response) => {
      cb(response)
    })
      .catch((error) => {
        errorCb(error)
      })
  },
  fetchInvitations (cb, errorCb) {
    axios.get(`${config.API_ADDRESS}/invitations`, { withCredentials: true }).then((response) => {
      cb(response)
    })
      .catch((error) => {
        errorCb(error)
      })
  },
  updateInvitationStatus (body, cb, errorCb) {
    axios.put(`${config.API_ADDRESS}/invitation`, body, { withCredentials: true }).then((response) => {
      cb(response)
    })
      .catch((error) => {
        errorCb(error)
      })
  },
  respond (_id, action, cb, errorCb) {
    axios.put(`${config.API_ADDRESS}/invitation`, { _id: _id, action: action }, { withCredentials: true }).then((response) => {
      cb(response)
    })
      .catch((error) => {
        errorCb(error)
      })
  }
}
