import client from '@/plugins/axios.js'

function getAll () {
  return client({ requiresAuth: false }).get('/projects')
}

export default {
  getAll
}
