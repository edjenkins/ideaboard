import * as types from '@/store/mutation-types'
import API from '@/api'

// initial state
const state = {
  user: {
    id: undefined,
    profile: {
      name: undefined,
      avatar: undefined,
      bio: undefined
    }
  },
  status: 'unauthenticated',
  authModalVisible: false
}

// getters
const getters = {
  user () {
    return state.user
  },
  isAuthenticated () {
    return (state.status === 'authenticated')
  },
  authModalVisible () {
    return state.authModalVisible
  }
}

// actions
const actions = {
  checkAuthStatus ({
    commit
  }) {
    API.auth.status(
      response => commit(types.CHECK_AUTH_STATUS_SUCCESS, {
        response
      }),
      response => commit(types.CHECK_AUTH_STATUS_FAILURE, {
        response
      }),
    )
  },
  logout ({
    commit
  }) {
    API.auth.logout(
      response => commit(types.LOGOUT_SUCCESS, {
        response
      }),
      response => commit(types.LOGOUT_FAILURE, {
        response
      }),
    )
  }
}

// mutations
const mutations = {
  [types.CHECK_AUTH_STATUS_SUCCESS] (initialState, {
    response
  }) {
    state.status = response.data.status
    state.user = response.data.user
  },
  [types.CHECK_AUTH_STATUS_FAILURE] () {
    state.status = 'unauthenticated'
    state.user = undefined
  },
  [types.LOGOUT_SUCCESS] () {
    state.status = 'unauthenticated'
    state.user = undefined
  },
  [types.LOGOUT_FAILURE] () { },
  [types.UPDATE_PROFILE] (initialState, profile) {
    state.user.profile = profile
  },
  [types.SHOW_AUTH_MODAL] () {
    state.authModalVisible = true
  },
  [types.HIDE_AUTH_MODAL] () {
    state.authModalVisible = false
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
