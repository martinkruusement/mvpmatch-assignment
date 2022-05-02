// import api from '@/services/api.js'
import { mockAuthenticate } from '@/services/mockdata/mock.js'
import cache from '@/services/cache.js'

const state = {
  loading: true,
  account: null
}

const getters = {
  loggedIn (state) {
    return !!state.account
  },
  account (state, getters) {
    if (!state.account) {
      return null
    }
    const account = { ...state.account, name: { ...state.account.name } }
    const first = account.name.first.trim()
    const last = account.name.last.trim()
    account.name.display = `${first} ${last}`
    return account
  }
}

const actions = {
  async authenticate (store) {
    store.commit('setSystemLoading', true)
    const accountData = await mockAuthenticate()
    if (accountData) {
      store.commit('saveAccountData', accountData)
      store.commit('setSystemLoading', false)
      // Continue loading in the background:
      store.dispatch('loadAllUsers')
      store.dispatch('loadAllProjects')
      store.dispatch('loadAllGateways')
    }

    // TODO: auth failed
  }
}

const mutations = {
  saveAccountData (state, payload) {
    state.account = payload
    cache.save('user', payload)
  },
  setSystemLoading (state) {
    console.log('authentication complete')
    state.initialized = true
  },
  setGatewaysLoading (state, status) {
    state.loading = status
  },
  wipeSystem (state) {
    state.user = null
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
