import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class NotesService {
  async getAll(query = {}) {
    const note = await dbContext.Notes.find(query).populate('creator').populate('bug')
    return note
  }

  async getById(id) {
    const note = await dbContext.Notes.findById(id).populate('creator').populate('bug')
    if (!note) {
      throw new BadRequest('Invalid ID')
    }
    return note
  }

  async create(body) {
    const note = await dbContext.Notes.create(body)
    const result = this.getById(note.id)
    return result
  }

  async edit(body) {
    const note = await dbContext.Notes.findByIdAndUpdate(body.id, body, { new: true, runValidators: true })
    if (!note) {
      throw new BadRequest('Invalid ID')
    }
    return note
  }

  async delete(id) {
    const note = await dbContext.Notes.findByIdAndDelete(id)
    if (!note) {
      throw new BadRequest('Invalid ID')
    }
    return note
  }
}

export const notesService = new NotesService()
