import client from '@/plugins/axios.js'

function getAll () {
  return client({ requiresAuth: false }).get('/users')
}

export default {
  getAll
}
