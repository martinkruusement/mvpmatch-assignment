// import api from '@/services/api.js'
import { mockAuthenticate } from '@/services/mockdata/mock.js'
import cache from '@/services/cache.js'

const state = {
  menuOpen: false,
  loading: true,
  account: null,
  dialogs: {
    logout: false
  },
  debug: {
    reportLines: false,
    general: false
  }
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
  },
  toggleMenu (store) {
    store.commit('setMenuState', !store.state.menuOpen)
  },
  openMenu (store) {
    store.commit('setMenuState', true)
  },
  closeMenu (store) {
    store.commit('setMenuState', false)
  },

  notification () { /* handled in Notifications.vue */ },
  updateScrollPosition () { /* handled in App.vue */ }
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
  setGatewaysLoading (state, to) {
    state.loading = to
  },
  wipeSystem (state) {
    state.user = null
  },
  setMenuState (state, to) {
    console.log('// TODO: menu unimplemented menu state to:', to)
    state.menuOpen = to
  },
  logoutDialog (state, to) {
    state.dialogs.logout = to
  },
  toggleDebug (state, payload) {
    const [[key, value]] = Object.entries(payload)
    state.debug[key] = value
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
