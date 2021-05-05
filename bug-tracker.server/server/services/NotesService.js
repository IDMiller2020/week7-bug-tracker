import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class NotesService {
  async delete(noteId, creatorId) {
    return await dbContext.Notes.findOneAndDelete({ _id: noteId, creatorId: creatorId })
  }
  // async getAll(bugId) {
  //   return await dbContext.Notes.findById(bugId)
  // }

  async create(body) {
    return await dbContext.Notes.create(body)
  }

  async findById(query) {
    const note = await dbContext.Notes.find(query).populate('creator')
    if (!note) {
      throw new BadRequest('Invalid Id')
    }
    return note
  }
}

export const notesService = new NotesService()
