import mockUserData from './user.json'
import { wait } from '@/utils.js'

async function mockAuthenticate () {
  await wait(1500)
  return Promise.resolve(mockUserData)
}

export { mockAuthenticate }
