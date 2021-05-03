import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class BugsService {
  async close(query) {
    const bug = await dbContext.Bugs.findById(query.bugId)
    if (!bug) { throw new BadRequest('Bug does not exist.') }
    if (bug.closed) { throw new BadRequest('This bug is closed and can not be edited.') }
    const data = await dbContext.Bugs.findOneAndUpdate({ _id: query.bugId }, { closed: true }, { new: true })
    if (!data) { throw new BadRequest('Invalid Id') }
    return data
  }

  async getAll() {
    return await dbContext.Bugs.find({}).populate('creator', 'name email picture')
  }

  async getById(query) {
    const bug = await dbContext.Bugs.findById(query.id).populate('creator')
    if (!bug) {
      throw new BadRequest('Invalid Id')
    }
    return bug
  }

  async edit(body) {
    const bug = await dbContext.Bugs.findById(body.id)
    if (bug.closed) { throw new BadRequest('This bug is closed and can not be edited.') } else {
      const data = await dbContext.Bugs.findOneAndUpdate(
        { _id: body.id }, body, { new: true }
      )
      if (!data) { throw new BadRequest('Invalid Id') }
      return data
    }
  }

  async create(body) {
    return await dbContext.Bugs.create(body)
  }

  // async find(query = {}) {
  //   const bugs = await dbContext.Bugs.find(query)
  //   return bugs
  // }
}

export const bugsService = new BugsService()
