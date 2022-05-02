import api from '@/services/api.js'
import cache from '@/services/cache.js'
import { buildReportId } from '@/functions/functions.js'
import { sortObjectsInArray, wait } from '@/utils.js'
import appConfig from '@/app-config.yml'

const state = {
  loading: {},
  config: {
    maxDate: appConfig.reports.dates.max,
    minDate: appConfig.reports.dates.min
  },
  reports: {}
}

const getters = {
  processedTransactions: (state, getters) => id => {
    let transactions = state.reports[id]

    let loading = false
    const refreshing = state.loading[id] // cached data exists

    if (transactions === undefined) {
      loading = true
      transactions = []
    }

    const projects = {}
    const gateways = {}
    let total = 0

    for (const transaction of transactions) {
      const id = transaction.paymentId
      const projectId = transaction.projectId
      const gatewayId = transaction.gatewayId

      // TODO: handle missing project and gateway references
      if (!(projectId in projects)) {
        projects[projectId] = {
          total: 0,
          project: getters.project(projectId),
          gateways: {},
          transactions: {
            list: {},
            sorted: []
          }
        }
      }

      if (!(gatewayId in projects[projectId].gateways)) {
        projects[projectId].gateways[gatewayId] = {
          total: 0,
          gateway: getters.gateway(gatewayId),
          transactions: {
            list: {},
            sorted: []
          }
        }
      }

      if (!(gatewayId in gateways)) {
        gateways[gatewayId] = {
          total: 0,
          gateway: getters.gateway(gatewayId),
          projects: {},
          transactions: {
            list: {},
            sorted: []
          }
        }
      }

      if (!(projectId in gateways[gatewayId].projects)) {
        gateways[gatewayId].projects[projectId] = {
          total: 0,
          project: getters.project(projectId),
          transactions: {
            list: {},
            sorted: []
          }
        }
      }

      const amount = parseFloat(transaction.amount).toFixed(2) * 100

      projects[projectId].total += amount
      projects[projectId].transactions.list[id] = transaction
      projects[projectId].transactions.sorted.push(transaction)

      projects[projectId].gateways[gatewayId].total += amount
      projects[projectId].gateways[gatewayId].transactions.list[id] = transaction
      projects[projectId].gateways[gatewayId].transactions.sorted.push(transaction)

      gateways[gatewayId].total += amount
      gateways[gatewayId].transactions.list[id] = transaction
      gateways[gatewayId].transactions.sorted.push(transaction)

      gateways[gatewayId].projects[projectId].total += amount
      gateways[gatewayId].projects[projectId].transactions.list[id] = transaction
      gateways[gatewayId].projects[projectId].transactions.sorted.push(transaction)

      total += amount
    }

    for (const p in projects) {
      const pTransactions = projects[p].transactions.sorted
      projects[p].transactions.sorted = sortObjectsInArray(pTransactions, 'created')
      projects[p].total /= 100

      for (const gw in projects[p].gateways) {
        const gwTransactions = projects[p].gateways[gw].transactions.sorted
        projects[p].gateways[gw].transactions.sorted = sortObjectsInArray(gwTransactions, 'created')
        projects[p].gateways[gw].total /= 100
      }
    }

    for (const gw in gateways) {
      const gwTransactions = gateways[gw].transactions.sorted
      gateways[gw].transactions.sorted = sortObjectsInArray(gwTransactions, 'created')
      gateways[gw].total /= 100

      for (const p in gateways[gw].projects) {
        const pTransactions = gateways[gw].projects[p].transactions.sorted
        gateways[gw].projects[p].transactions.sorted = sortObjectsInArray(pTransactions, 'created')
        gateways[gw].projects[p].total /= 100
      }
    }

    total /= 100

    return {
      id,
      loading,
      refreshing,
      projects,
      gateways,
      transactions: {
        list: transactions,
        sorted: sortObjectsInArray(Object.values(transactions), 'created')
      },
      total
    }
  }
}

const actions = {
  async loadReport (store, { projectId, gatewayId, startDate, endDate }) {
    console.log('loadreport')
    const id = buildReportId({ projectId, gatewayId, startDate, endDate })
    const cachedData = cache.read(id)
    if (cachedData) {
      store.commit('saveReport', { id, report: cachedData })
    }

    store.commit('setReportLoading', { id, to: true })
    await wait(2000)
    const report = await api.reports.load({ projectId, gatewayId, startDate, endDate })
    console.log('report loaded')
    if (report) {
      store.commit('saveReport', { id, report: report })
      store.commit('saveTransactionsList', report)
      // TODO: cache new transactions
      cache.save(id, report)
    }

    store.commit('setReportLoading', { id, to: false })
  }
}

const mutations = {
  saveReport (state, { id, report }) {
    state.reports[id] = report
  },
  setReportLoading (state, { id, to }) {
    state.loading[id] = to
  },
  wipeReports (state) {
    state.reports = {}
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
