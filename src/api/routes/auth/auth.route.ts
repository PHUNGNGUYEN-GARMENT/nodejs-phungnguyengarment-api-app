import { Router } from 'express'
import { check } from 'express-validator'
import { constantValidators } from '~/api/utils/constant'
import AuthController from '~/controllers/auth/auth.controller'

class AuthRoute {
  router = Router()
  controller = new AuthController()

  constructor() {
    this.initialize()
  }

  private initialize() {
    // Login chanel
    this.router.post(
      '/login',
      check('email')
        .exists()
        .withMessage(constantValidators.EMAIL_IS_EMPTY)
        .isEmail()
        .withMessage(constantValidators.EMAIL_IS_IN_WRONG_FORMAT),
      check('password')
        .exists()
        .withMessage(constantValidators.PASSWORD_IS_EMPTY)
        .isLength({ min: 8 })
        .withMessage(constantValidators.PASSWORD_LENGTH_MUST_BE_MORE_THAN_8),
      this.controller.login
    )

    // Register chanel
    this.router.post(
      '/register',
      check('email')
        .exists()
        .withMessage(constantValidators.EMAIL_IS_EMPTY)
        .isEmail()
        .withMessage(constantValidators.EMAIL_IS_IN_WRONG_FORMAT),
      check('password')
        .exists()
        .withMessage(constantValidators.PASSWORD_IS_EMPTY)
        .isLength({ min: 8 })
        .withMessage(constantValidators.PASSWORD_LENGTH_MUST_BE_MORE_THAN_8),
      check('role')
        .exists()
        .withMessage(constantValidators.ROLE_IS_EMPTY)
        .isString()
        .withMessage(constantValidators.ROLE_IS_NOT_VALID),
      this.controller.register
    )
  }
}

export default new AuthRoute().router
