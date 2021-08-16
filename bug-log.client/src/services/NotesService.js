import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class NotesService {
  async getAllNotes(query = {}) {
    const res = await api.get('api/notes')
    logger.log('response from the server get all notes:', res)
    AppState.bugs = res.data
  }

  async createNote(rawNote) {
    const res = await api.post('api/note', rawNote)
    logger.log('response from the server create note:', res.data)
    AppState.notes[res.data.bugId].push(res.data)
  }

  async editNote(rawNote) {
    const res = await api.post('api/note/' + rawNote.id, rawNote)
    logger.log('response from the server edit note:', res.data)
    AppState.notes[res.data.bugId].push(res.data)
  }

  async removeNote(id) {
    const res = await api.delete('api/bugs', id)
    logger.log('response delete from the server remove note:', res.data)
    AppState.notes[res.data.bugId] = AppState.notes[res.data.bugId].filter(n => n.id !== id)
  }
}

export const notesService = new NotesService()
