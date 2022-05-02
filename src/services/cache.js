import { isPast } from '@/utils.js'

const time = { HOUR: 3600000, DAY: 86400000 }

function save (key, data, lifetimeHours = 1) {
  const timestamp = new Date().getTime()
  const expiry = timestamp + (lifetimeHours * time.HOUR)

  const payload = {
    expiry,
    data
  }

  window.localStorage.setItem(key, JSON.stringify(payload))
}

function read (key) {
  const payload = JSON.parse(window.localStorage.getItem(key))

  if (!validate(payload)) {
    clear(key)
    return null
  }

  return payload.data
}

function clear (key = 'all') {
  if (key == 'all') {
    window.localStorage.clear()
    return
  }
  window.localStorage.removeItem(key)
}

function validate (payload) {
  try {
    if (!isPast(payload.expiry)) {
      return true
    }
  } catch {
    return false
  }
}

export default {
  save,
  read,
  clear
}
