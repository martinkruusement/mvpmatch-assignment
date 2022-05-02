import client from '@/plugins/axios.js'

export default {
  getUsers () {
    return client({ requiresAuth: true }).get('/account')
  }
}
