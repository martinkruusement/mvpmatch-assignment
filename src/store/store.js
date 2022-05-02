import { createStore } from 'vuex'
import system from '@/store/modules/system.js'
import users from '@/store/modules/users.js'
import projects from '@/store/modules/projects.js'
import gateways from '@/store/modules/gateways.js'
import reports from '@/store/modules/reports.js'
import transactions from '@/store/modules/transactions.js'

export default createStore({
  strict: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    system,
    users,
    projects,
    gateways,
    reports,
    transactions
  }
})
