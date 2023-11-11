import { Router } from 'express'
import { body, param } from 'express-validator'
import UserController from '~/controllers/user.controller'
import { requestValidationRules } from '../middleware/response-validator'

class UserRoute {
  router = Router()
  controller = new UserController()

  constructor() {
    this.initialize()
  }

  private initialize() {
    // Get user by userID
    this.router.get(
      '/find/:id',
      requestValidationRules([
        param('id')
          .exists()
          .withMessage('This field can not empty!')
          .isString()
          .withMessage('This field must be string type!')
      ]),
      this.controller.getUserByID
    )

    // Get all users
    this.router.get('/find', this.controller.getAllUsers)

    // Update user by userID
    this.router.put(
      '/',
      requestValidationRules([
        body('userID')
          .exists()
          .withMessage('This field can not empty!')
          .isString()
          .withMessage('This field must be string type!')
      ]),
      this.controller.updateUserByID
    )

    // Delete user by userID
    this.router.delete(
      '/:id',
      requestValidationRules([
        param('id')
          .exists()
          .withMessage('This field can not empty!')
          .isString()
          .withMessage('This field must be string type!')
      ]),
      this.controller.deleteUserByID
    )
  }
}

export default new UserRoute().router
