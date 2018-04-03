import axios from 'axios'
import * as config from '@/api/config'

export default {
  dashboard (ideaId, cb, errorCb) {
    axios.get(`${config.API_ADDRESS}/tasks/${ideaId}`, { withCredentials: true }).then((response) => {
      cb(response)
    })
      .catch((error) => {
        errorCb(error)
      })
  },
  view (id, cb, errorCb) {
    axios.get(`${config.API_ADDRESS}/task/${id}`, { withCredentials: true }).then((response) => {
      cb(response)
    })
      .catch((error) => {
        errorCb(error)
      })
  },
  add (postData, cb, errorCb) {
    axios.post(`${config.API_ADDRESS}/task`, postData, { withCredentials: true }).then((response) => {
      cb(response)
    })
      .catch((error) => {
        errorCb(error)
      })
  },
  destroy (postData, cb, errorCb) {
    axios.post(`${config.API_ADDRESS}/task/destroy`, postData, { withCredentials: true }).then((response) => {
      cb(response)
    })
      .catch((error) => {
        errorCb(error)
      })
  },
  fetchResponses (type, id, cb, errorCb) {
    axios.get(`${config.API_ADDRESS}/task/${type}/${id}/responses`, { withCredentials: true }).then((response) => {
      cb(response)
    })
      .catch((error) => {
        errorCb(error)
      })
  },
  submitResponse (type, id, postData, cb, errorCb) {
    axios.post(`${config.API_ADDRESS}/task/${type}/${id}/response`, postData, { withCredentials: true }).then((response) => {
      cb(response)
    })
      .catch((error) => {
        errorCb(error)
      })
  },
  likeResponse (responseId, cb, errorCb) {
    axios.put(`${config.API_ADDRESS}/task/response/like`, { response_id: responseId }, { withCredentials: true }).then((response) => {
      cb(response)
    })
      .catch((error) => {
        errorCb(error)
      })
  },
  dislikeResponse (responseId, cb, errorCb) {
    axios.put(`${config.API_ADDRESS}/task/response/dislike`, { response_id: responseId }, { withCredentials: true }).then((response) => {
      cb(response)
    })
      .catch((error) => {
        errorCb(error)
      })
  },
  destroyResponse (postData, cb, errorCb) {
    axios.post(`${config.API_ADDRESS}/task/response/destroy`, postData, { withCredentials: true }).then((response) => {
      cb(response)
    })
      .catch((error) => {
        errorCb(error)
      })
  }
}
