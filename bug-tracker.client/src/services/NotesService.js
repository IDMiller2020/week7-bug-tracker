import { AppState } from '../AppState.js'
import router from '../router'
import { api } from './AxiosService.js'

class NotesService {
  async getNoteByBugId(id) {
    const res = await api.get('api/notes/' + id)
    AppState.activeNote = res.data
  }

  async createNote(newNote) {
    const res = await api.post('api/notes', newNote)
    AppState.notes.push(res.data)
    console.log(res.data)
    // everytime a note is created, we will change pages
    router.push({ name: 'NoteDetails', params: { id: res.data.id } })
  }

  async closeNote(id) {
    await api.delete('api/notes/' + id)
  }
}

export const notesService = new NotesService()
