import { Router } from 'express'
import { body } from 'express-validator'
import AuthController from '~/controllers/auth/auth.controller'
import { requestValidationRules } from '~/middleware/request-validator'

class AuthRoute {
  router = Router()
  controller = new AuthController()

  constructor() {
    this.initialize()
  }

  private initialize() {
    this.router.post(
      '/login',
      requestValidationRules([
        body('email').not().isEmpty().withMessage('Email can not be empty').isEmail().withMessage('Email is invalid'),
        body('password').not().isEmpty().withMessage('Password can not be empty')
      ]),
      this.controller.login
    )
    this.router.post(
      '/register',
      requestValidationRules([
        body('email').not().isEmpty().withMessage('Email can not be empty').isEmail().withMessage('Email is invalid'),
        body('password').not().isEmpty().withMessage('Password can not be empty'),
        body('roleID').not().isEmpty().withMessage('Role ID can not be empty')
      ]),
      this.controller.register
    )
  }
}

export default new AuthRoute().router
