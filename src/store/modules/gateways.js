import api from '@/services/api.js'
import cache from '@/services/cache.js'

const state = {
  loading: true,
  gateways: {}
}

const getters = {
  gatewaysCount (state) {
    return Object.keys(state.gateways).length
  },
  gateway: state => id => {
    return state.gateways[id] || null
  }
}

const actions = {
  async loadAllGateways (store) {
    const cachedData = cache.read('gateways')
    if (cachedData) {
      store.commit('saveGatewaysList', cachedData)
    }

    store.commit('setGatewaysLoading', true)
    const gateways = await api.gateways.getAll()
    if (gateways) {
      store.commit('wipeGateways')
      store.commit('saveGatewaysList', gateways)
      cache.save('gateways', gateways)
    }

    store.commit('setGatewaysLoading', false)
  }
}

const mutations = {
  saveGatewaysList (state, gateways) {
    for (const gateway of gateways) {
      state.gateways[gateway.gatewayId] = gateway
    }
  },
  setGatewaysLoading (state, status) {
    state.loading = status
  },
  wipeGateways (state) {
    state.gateways = {}
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
