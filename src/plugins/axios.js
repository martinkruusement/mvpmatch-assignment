import axios from 'axios'
import errors from '@/services/api/_errors.js'

export default ({ requiresAuth = true } = {}) => {
  const token = window.localStorage.getItem('authToken')
  if (requiresAuth && !token) {
    // TODO: token expiry and refresh
    return Promise.resolve(errors.FORBIDDEN)
  }

  const options = {
    headers: {
      Authorization: requiresAuth ? `Bearer ${token}` : null
    },
    baseURL: getApiUrl()
  }

  const instance = axios.create(options)
  instance.interceptors.response.use(responseHandler, errorHandler)

  return instance
}

function errorHandler () {
  return null
}
function responseHandler (response) {
  // console.log(response)
  if (parseInt(response?.data.code) === 200) {
    if (response.data.data) {
      return response.data.data
    }
  }
  return null
}

function getApiUrl () {
  const fromEnv = import.meta.env.VITE_APP_API_URL

  if (fromEnv) {
    console.log(`%c API baseURL found from env: ${fromEnv} `, 'background: #00b62f; color: green; font-weight: bold;')
    return fromEnv
  }

  // Fall back to hardcoded API urls if no env variables found:
  const fallbacks = {
    production: 'https://api.limitlessprojects.com',
    development: 'https://apidev.limitlessprojects.com'
  }

  console.log(`%c VITE_APP_API_URL not found in env: ${fromEnv} `, 'background: #650000; color: red; font-weight: bold;')
  if (window.location.hostname === 'app.limitlessprojects.com') {
    console.log(`%c↳ Using [PROD] fallback ${fallbacks.production} `, 'color: red;font-weight: bold;')
    return fallbacks.production
  }

  console.log(`%c↳ Using [DEV] fallback ${fallbacks.development} `, 'color: red;font-weight: bold;')
  return fallbacks.development
}
