import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class BugsService {
  async getAllBugs(query = {}) {
    const res = await api.get('api/bugs')
    // logger.log('response from the server:', res)
    AppState.bugs = res.data
  }

  async getNotesInBug(id) {
    const res = await api.get('api/bugs/' + id + '/notes')
    // logger.log('response notesIn from the server:', res.data)
    AppState.notes[id] = res.data
    // logger.log('Notes in appState:', AppState.notes[id])
  }

  async createBug(rawBug) {
    const res = await api.post('api/bugs', rawBug)
    // logger.log('response from the server:', res.data)
    AppState.bugs.push(res.data)
  }

  async editBug(rawBug) {
    const res = await api.put('api/bugs/' + rawBug.id, rawBug)
    // logger.log('response from the server edit bug:', res.data)
    const foundBug = AppState.bugs.find(b => b.id === res.data.id)
    Object.assign(foundBug, res.data)
    return res.data
  }

  async removeBug(id) {
    const res = await api.delete('api/bugs/' + id)
    // logger.log('response delete from the server:', res.data)
    const foundBug = AppState.bugs.find(b => b.id === res.data.id)
    Object.assign(foundBug, res.data)
    return res.data
  }
}

export const bugsService = new BugsService()
