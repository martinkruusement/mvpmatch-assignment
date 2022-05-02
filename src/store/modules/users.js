import api from '@/services/api.js'
import cache from '@/services/cache.js'

const state = {
  loading: true,
  users: {}
}

const getters = {
  usersCount (state) {
    return Object.keys(state.users).length
  },
  user: state => id => {
    return state.users[id] || null
  }
}

const actions = {
  async loadAllUsers (store) {
    const cachedData = cache.read('users')
    if (cachedData) {
      store.commit('saveUsersList', cachedData)
    }
    store.commit('setUsersLoading', true)
    const users = await api.users.getAll()
    if (users) {
      store.commit('wipeUsers')
      store.commit('saveUsersList', users)
      cache.save('users', users)
    }

    store.commit('setUsersLoading', false)
  }
}

const mutations = {
  saveUsersList (state, users) {
    for (const user of users) {
      state.users[user.userId] = user
    }
  },
  setUsersLoading (state, status) {
    state.loading = status
  },
  wipeUsers (state) {
    state.users = {}
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
