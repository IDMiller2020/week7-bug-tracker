import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class NotesService {
  async edit(body) {
    const note = await dbContext.Notes.findById(body.id)
    if (!note) { throw new BadRequest('Note does not exist.') }
    if (note.closed) { throw new BadRequest('This note is closed.') } else {
      const data = await dbContext.Notes.findOneAndUpdate(
        { _id: body.id }, body, { new: true }
      )
      if (!data) { throw new BadRequest('Invalid Id') }
      return data
    }
  }

  async create(body) {
    return await dbContext.Notes.create(body)
  }

  async getAll() {
    return await dbContext.Notes.find()
  }

  async find(query = {}) {
    const notes = await dbContext.Notes.find(query)
    return notes
  }

  async findById(id) {
    const note = await dbContext.Notes.findById(id)
    if (!note) {
      throw new BadRequest('Invalid Id')
    }
    return note
  }
}

export const notesService = new NotesService()
