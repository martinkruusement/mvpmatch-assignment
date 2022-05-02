// import api from '@/services/api.js'
// import cache from '@/services/cache.js'

const state = {
  loading: false,
  transactions: {}
}

const getters = {
  transactions (state) {
    return state.transactions
  },
  transaction: state => id => {
    return state.transactions[id] || null
  }
}

const actions = {
  async loadTransaction (store, id) {
    // const transaction = await api.transactions.load(id)
    // TODO: load transaction, cache
  }
}

const mutations = {
  saveTransaction (state, transaction) {
    const id = transaction.paymentId
    state.transactions[id] = transaction
  },
  saveTransactionsList (state, transactions) {
    for (const transaction of transactions) {
      state.transactions[transaction.paymentId] = transaction
    }
  },
  setTransactionsLoading (state, status) {
    state.loading = status
  },
  wipeTransactions (state) {
    state.transactions = {}
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
