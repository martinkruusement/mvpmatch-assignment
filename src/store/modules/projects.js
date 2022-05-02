import api from '@/services/api.js'
import cache from '@/services/cache.js'

const state = {
  loading: true,
  projects: {}
}

const getters = {
  projectsCount (state) {
    return Object.keys(state.projects).length
  },
  project: state => id => {
    return state.projects[id]
  }
}

const actions = {
  async loadAllProjects (store) {
    const cachedData = cache.read('projects')
    if (cachedData) {
      store.commit('saveProjectsList', cachedData)
    }

    store.commit('setProjectsLoading', true)
    const projects = await api.projects.getAll()
    if (projects) {
      store.commit('wipeProjects')
      store.commit('saveProjectsList', projects)
      cache.save('projects', projects)
    }

    store.commit('setProjectsLoading', false)
  }
}

const mutations = {
  saveProjectsList (state, projects) {
    for (const project of projects) {
      state.projects[project.projectId] = project
    }
  },
  setProjectsLoading (state, status) {
    state.loading = status
  },
  wipeProjects (state) {
    state.projects = {}
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
