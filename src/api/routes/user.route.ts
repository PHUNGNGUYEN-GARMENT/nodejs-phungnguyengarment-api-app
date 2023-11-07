import { Router } from 'express'
import UserController from '~/controllers/user.controller'

class UserRoute {
  router = Router()
  controller = new UserController()

  constructor() {
    this.initialize()
  }

  private initialize() {
    this.router.get('/find/:id', this.controller.getUserByID)
    this.router.get('/find', this.controller.getAllUsers)
    this.router.put('/:id', this.controller.updateUserByID)
    this.router.delete('/:id', this.controller.deleteUserByID)
  }
}

export default new UserRoute().router
