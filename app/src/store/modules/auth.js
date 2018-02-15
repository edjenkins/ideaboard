import * as types from '@/store/mutation-types'
import API from '@/api'
import _find from 'lodash/find'

// initial state
const state = {
  user: {
    id: undefined,
    profile: {
      name: undefined,
      avatar: undefined,
      bio: undefined
    },
    permissions: []
  },
  notifications: [],
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
  },
  notifications () {
    return state.notifications
  },
  permissions () {
    return state.user.permissions
  },
  isAdmin () {
    return _find(state.user.permissions, { type: 'admin' })
  },
  isModerator () {
    return _find(state.user.permissions, { type: 'moderator' })
  },
  isOrganiser () {
    return _find(state.user.permissions, { type: 'organiser' })
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
  getNotifications ({
    commit
  }) {
    API.notification.fetch(
      (response) => {
        state.notifications = response.data
      },
      (response) => {
        state.notifications = []
      },
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
    state.notifications = []
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
