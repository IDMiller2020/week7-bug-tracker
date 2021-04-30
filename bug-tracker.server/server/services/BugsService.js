import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class BugsService {
  async edit(body) {
    const bug = await dbContext.Bugs.findById(body.id)
    if (!bug) { throw new BadRequest('Bug does not exist.') }
    if (bug.closed) { throw new BadRequest('This bug is closed.') } else {
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

  async getAll() {
    return await dbContext.Bugs.find()
  }

  async find(query = {}) {
    const bugs = await dbContext.Bugs.find(query)
    return bugs
  }

  async findById(id) {
    const bug = await dbContext.Bugs.findById(id)
    if (!bug) {
      throw new BadRequest('Invalid Id')
    }
    return bug
  }
}

export const bugsService = new BugsService()
