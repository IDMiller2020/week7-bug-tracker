import { AppState } from '../AppState.js'
import router from '../router'
import { api } from './AxiosService.js'

class BugsService {
  async getBugs() {
    const res = await api.get('api/bugs')
    AppState.bugs = res.data
    AppState.openBugs = res.data.filter(b => !b.closed)
    AppState.closedBugs = res.data.filter(b => b.closed)
  }

  async getBugById(id) {
    const res = await api.get('api/bugs/' + id)
    AppState.activeBug = res.data
  }

  async createBug(newBug) {
    const res = await api.post('api/bugs', newBug)
    AppState.bugs.push(res.data)
    // everytime a bug is created, we will change pages
    router.push({ name: 'BugDetails', params: { id: res.data.id } })
  }

  async closeBug(id) {
    await api.delete('api/bugs/' + id)
  }

  async editBug(editedBug) {
    const res = await api.put('api/bugs/' + editedBug.bugId, editedBug)
    AppState.activeBug.push(res.data)
  }
}

export const bugsService = new BugsService()
