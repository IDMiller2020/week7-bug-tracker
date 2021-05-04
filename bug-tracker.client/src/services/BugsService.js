import { AppState } from '../AppState.js'
import router from '../router'
import { api } from './AxiosService.js'

class BugsService {
  async getBugs() {
    const res = await api.get('api/bugs')
    AppState.bugs = res.data
    console.log('AppState:')
    console.log(AppState.bugs)
  }

  async getBugById(id) {
    const res = await api.get('api/bugs/' + id)
    AppState.activeBug = res.data
  }

  async createBug(newBug) {
    const res = await api.post('api/bugs', newBug)
    AppState.bugs.push(res.data)
    console.log(res.data)
    // everytime a bug is created, we will change pages
    router.push({ name: 'BugDetails', params: { id: res.data.id } })
  }

  async closeBug(id) {
    await api.delete('api/bugs/' + id)
  }
}

export const bugsService = new BugsService()
