import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'

class BugsService {
  async getAll(query = {}) {
    const bug = await dbContext.Bugs.find(query).populate('creator')
    return bug
  }

  async getById(id) {
    const bug = await dbContext.Bugs.findById(id).populate('creator')
    if (!bug) {
      throw new BadRequest('Invalid ID')
    }
    return bug
  }

  async create(body) {
    const bug = await dbContext.Bugs.create(body)
    return this.getById(bug.id)
  }

  async edit(body) {
    const foundBug = this.getAll({ id: body.id, creatorId: body.creatorId })
    if (!foundBug) {
      throw new BadRequest('Invalid ID')
    }
    const bug = await dbContext.Bugs.findOneAndUpdate(body.id, body, { new: true, runValidators: true }) // .populate('creator')
    return bug
  }

  async delete(id, userId) {
    const bug = await this.getById(id)
    if (bug.creatorId === userId) {
      bug.closed = true
      bug.closedDate = new Date().toString()
      const result = await this.edit(bug)
      return result
    } else if (!bug) {
      throw new BadRequest('Invalid ID')
    } else {
      throw new Forbidden('Unauthorized Bug close')
    }
  }
}

export const bugsService = new BugsService()
