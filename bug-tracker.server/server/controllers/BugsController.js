import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { bugsService } from '../services/BugsService'
import { notesService } from '../services/NotesService'

export class BugsController extends BaseController {
  constructor() {
    super('api/bugs')
    this.router
      .get('', this.getAll)
      .get('/:id', this.getById)
      .get('/:id/notes', this.getNotesByBugId)
      // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .put('/:id', this.edit)
      .delete('/:id', this.closeBugById)
  }

  async edit(req, res, next) {
    try {
      req.creatorId = req.userInfo.id
      req.body.id = req.params.id
      delete req.body.closed
      const data = await bugsService.edit(req.body)
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async getAll(req, res, next) {
    try {
      const data = await bugsService.getAll()
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async getById(req, res, next) {
    try {
      req.body.id = req.params.id
      const data = await bugsService.getById(req.body)
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      req.body.creatorId = req.userInfo.id
      const data = await bugsService.create(req.body)
      // @ts-ignore
      data._doc.creator = req.userInfo
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async getNotesByBugId(req, res, next) {
    try {
      const data = await notesService.findById({ bugId: req.params.id })
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async closeBugById(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const data = await bugsService.close({ bugId: req.params.id })
      res.send(data)
    } catch (error) {
      next(error)
    }
  }
}
