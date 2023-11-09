import { Router } from 'express'
import { check } from 'express-validator'
import { validators } from '~/api/utils/constant'
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
        .withMessage(validators.EMAIL_IS_EMPTY)
        .isEmail()
        .withMessage(validators.EMAIL_IS_IN_WRONG_FORMAT),
      check('password')
        .exists()
        .withMessage(validators.PASSWORD_IS_EMPTY)
        .isLength({ min: 8 })
        .withMessage(validators.PASSWORD_LENGTH_MUST_BE_MORE_THAN_8),
      this.controller.login
    )

    // Register chanel
    this.router.post(
      '/register',
      check('email')
        .exists()
        .withMessage(validators.EMAIL_IS_EMPTY)
        .isEmail()
        .withMessage(validators.EMAIL_IS_IN_WRONG_FORMAT),
      check('password')
        .exists()
        .withMessage(validators.PASSWORD_IS_EMPTY)
        .isLength({ min: 8 })
        .withMessage(validators.PASSWORD_LENGTH_MUST_BE_MORE_THAN_8),
      check('role').exists().withMessage(validators.ROLE_IS_EMPTY).isString().withMessage(validators.ROLE_IS_NOT_VALID),
      this.controller.register
    )
  }
}

export default new AuthRoute().router
