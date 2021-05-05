import { AppState } from '../AppState.js'
import { api } from './AxiosService.js'

class NotesService {
  async getNoteByBugId(id) {
    const res = await api.get('api/bugs/' + id + '/notes')
    AppState.activeNotes = res.data
  }

  async createNote(body) {
    await api.post('api/notes', body)
    this.getNoteByBugId(body.bugId)
  }

  async deleteNote(id) {
    await api.delete('api/notes/' + id)
    AppState.activeNotes = AppState.activeNotes.filter(n => n.id !== id)
  }
}

export const notesService = new NotesService()
