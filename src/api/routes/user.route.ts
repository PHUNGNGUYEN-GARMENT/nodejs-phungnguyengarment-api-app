import { Router } from 'express'
import UserController from '~/controllers/user.controller'
import { validationRules } from '../middleware/request-validator'

class UserRoute {
  router = Router()
  controller = new UserController()
  constructor() {
    this.initialize()
  }

  private initialize() {
    // Create new item
    this.router.post(
      '/register',
      validationRules([
        { field: 'username', fieldType: 'string', location: 'body' },
        { field: 'password', fieldType: 'string', location: 'body' },
        { field: 'role', fieldType: 'string', location: 'body' }
      ]),
      this.controller.register
    )

    this.router.post(
      '/login',
      validationRules([
        { field: 'username', fieldType: 'string', location: 'body' },
        { field: 'password', fieldType: 'string', location: 'body' }
      ]),
      this.controller.login
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
      this.controller.getItemByusername
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
