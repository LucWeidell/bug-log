import BaseController from '../utils/BaseController'
import { notesService } from '../services/NotesService'
import { Auth0Provider } from '@bcwdev/auth0provider'

export class NotesController extends BaseController {
  constructor() {
    super('api/notes')
    this.router
      .get('', this.getAll)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .delete('/:id', this.delete)
  }

  /**
       * Sends all notes to a client by request
       * @param {import('express').Request} req
       * @param {import('express').Response} res
       * @param {import('express').NextFunction} next
       */
  async getAll(req, res, next) {
    try {
      const note = await notesService.getAll(req.query)
      res.send(note)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const note = await notesService.create(req.body)
      res.send(note)
    } catch (error) {
      next(error)
    }
  }

  /**
       * Removes data by id from a client by request
       * @param {import('express').Request} req
       * @param {import('express').Response} res
       * @param {import('express').NextFunction} next
       */
  async delete(req, res, next) {
    try {
      const note = await notesService.delete(req.params.id)
      res.send(note)
    } catch (error) {
      next(error)
    }
  }
}
