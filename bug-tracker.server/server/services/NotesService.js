import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class NotesService {
  // async getAll(bugId) {
  //   return await dbContext.Notes.findById(bugId)
  // }

  async create(body) {
    return await dbContext.Notes.create(body)
  }

  async findById(query) {
    const note = await dbContext.Notes.find(query)
    if (!note) {
      throw new BadRequest('Invalid Id')
    }
    return note
  }
}

export const notesService = new NotesService()
