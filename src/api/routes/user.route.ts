import { Router } from 'express'
import AuthController from '~/controllers/auth/auth.controller'
import UserController from '~/controllers/user.controller'
import { validationRules } from '../middleware/request-validator'

class UserRoute {
  router = Router()
  controller = new UserController()
  authController = new AuthController()
  constructor() {
    this.initialize()
  }

  private initialize() {
    // Create new item
    this.router.post(
      '/register',
      validationRules([
        { field: 'username', fieldType: 'string', location: 'body' },
        { field: 'password', fieldType: 'string', location: 'body' }
      ]),
      this.authController.register
    )

    this.router.post(
      '/login',
      validationRules([
        { field: 'username', fieldType: 'string', location: 'body' },
        { field: 'password', fieldType: 'string', location: 'body' }
      ]),
      this.authController.login
    )

    this.router.post(
      '/refresh',
      validationRules([
        { field: 'username', fieldType: 'string', location: 'body' },
        { field: 'password', fieldType: 'string', location: 'body' }
      ]),
      this.authController.login
    )

    // Get item
    this.router.get(
      '/:id',
      validationRules([{ field: 'id', fieldType: 'int', location: 'params' }]),
      this.controller.getUserByPk
    )

    // Get item
    this.router.get(
      '/username/:username',
      validationRules([{ field: 'username', fieldType: 'string', location: 'params' }]),
      this.controller.getItemByUsername
    )

    // Get all items
    this.router.post(
      '/find',
      validationRules([
        { field: 'filter', fieldType: 'object', location: 'body' },
        { field: 'paginator', fieldType: 'object', location: 'body' },
        { field: 'search', fieldType: 'object', location: 'body' },
        { field: 'sorting', fieldType: 'object', location: 'body' }
      ]),
      this.controller.getAllUsers
    )

    // Update item by productID and importedID
    this.router.put(
      '/:id',
      validationRules([{ field: 'id', fieldType: 'int', location: 'params' }]),
      this.controller.updateUserByPk
    )

    // Delete item by productID
    this.router.delete(
      '/:id',
      validationRules([{ field: 'id', fieldType: 'int', location: 'params' }]),
      this.controller.deleteItemByPk
    )
  }
}

export default new UserRoute().router
