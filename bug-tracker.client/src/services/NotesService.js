import { AppState } from '../AppState.js'
import { logger } from '../utils/Logger.js'
import { api } from './AxiosService.js'

class NotesService {
  async getNoteByBugId(id) {
    const res = await api.get('api/bugs/' + id + '/notes')
    AppState.activeNotes = res.data
    logger.log(res.data)
  }

  async createNote(body) {
    const res = await api.post('api/notes', body)
    AppState.notes.push(res.data)
    logger.log(res.data)
  }

  async closeNote(id) {
    await api.delete('api/notes/' + id)
  }
}

export const notesService = new NotesService()
