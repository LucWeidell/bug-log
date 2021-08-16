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
    const bug = await this.getById(body.id)
    if (bug.creatorId.toString() === bug.creatorId.toString()) {
      if (!bug) {
        throw new BadRequest('Invalid ID')
      }
      if (bug.closed) {
        throw new Forbidden('Bug Already Closed.')
      }
      delete body.closed
      const bugResult = await dbContext.Bugs.findByIdAndUpdate(body.id, body, { new: true, runValidators: true }) // .populate('creator')
      return bugResult
    } else {
      throw new Forbidden('Unauthorized Bug close')
    }
  }

  async delete(id, userId) {
    const bug = await this.getById(id)
    if (bug.creatorId.toString() === userId) {
      if (bug.closed) {
        throw new Forbidden('Bug Already Closed.')
      }
      bug.closed = true
      bug.closedDate = new Date().toString()
      const result = await dbContext.Bugs.findByIdAndUpdate(bug.id, bug, { new: true, runValidators: true })
      return result
    } else if (!bug) {
      throw new BadRequest('Invalid ID')
    } else {
      throw new Forbidden('Unauthorized Bug close')
    }
  }
}

export const bugsService = new BugsService()
