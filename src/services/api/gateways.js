import client from '@/plugins/axios.js'

function getAll () {
  return client({ requiresAuth: false }).get('/gateways')
}

export default {
  getAll
}
