import { Router } from 'express'
import { body, param } from 'express-validator'
import ProductController from '~/controllers/product.controller'
import { requestValidationRules } from '~/middleware/response-validator'
import { validators } from '../utils/constant'

class ProductRoute {
  router = Router()
  controller = new ProductController()

  constructor() {
    this.initialize()
  }

  private initialize() {
    // Create new item
    this.router.post(
      '/',
      requestValidationRules([
        body('productCode')
          .exists()
          .withMessage(validators.ROLE_IS_EMPTY)
          .isString()
          .withMessage(validators.ROLE_MUST_BE_STRING_TYPE),
        body('quantityPO')
          .exists()
          .withMessage(validators.ROLE_IS_EMPTY)
          .isFloat()
          .withMessage(validators.ROLE_MUST_BE_FLOAT_TYPE),
        body('dateInputNPL')
          .exists()
          .withMessage(validators.ROLE_IS_EMPTY)
          .isString()
          .withMessage(validators.ROLE_MUST_BE_STRING_TYPE),
        body('dateOutputFCR')
          .exists()
          .withMessage(validators.ROLE_IS_EMPTY)
          .isString()
          .withMessage(validators.ROLE_MUST_BE_STRING_TYPE),
        body('status')
          .exists()
          .withMessage(validators.ROLE_IS_EMPTY)
          .isString()
          .withMessage(validators.ROLE_MUST_BE_STRING_TYPE)
      ]),
      this.controller.createNewItem
    )

    // Get item
    this.router.get(
      '/:id',
      requestValidationRules([
        param('id')
          .exists()
          .withMessage(validators.ROLE_IS_EMPTY)
          .isInt()
          .withMessage(validators.ROLE_MUST_BE_INTEGER_TYPE)
      ]),
      this.controller.getItemByPk
    )

    this.router.get(
      '/productCode/:productCode',
      requestValidationRules([
        param('productCode')
          .exists()
          .withMessage(validators.ROLE_IS_EMPTY)
          .isString()
          .withMessage(validators.ROLE_MUST_BE_STRING_TYPE)
      ]),
      this.controller.getItemByProductCode
    )

    // Get items
    this.router.post(
      '/find',
      requestValidationRules([
        body('filter')
          .exists()
          .withMessage(validators.ROLE_IS_EMPTY)
          .isObject()
          .withMessage('This field must be object type!'),
        body('paginator')
          .exists()
          .withMessage(validators.ROLE_IS_EMPTY)
          .isObject()
          .withMessage('This field must be object type!'),
        body('search')
          .exists()
          .withMessage(validators.ROLE_IS_EMPTY)
          .isObject()
          .withMessage('This field must be object type!'),
        body('sorting')
          .exists()
          .withMessage(validators.ROLE_IS_EMPTY)
          .isObject()
          .withMessage('This field must be object type!')
      ]),
      this.controller.getItems
    )

    // Update item by id
    this.router.put(
      '/:id',
      requestValidationRules([
        param('id')
          .exists()
          .withMessage(validators.ROLE_IS_EMPTY)
          .isInt()
          .withMessage(validators.ROLE_MUST_BE_INTEGER_TYPE)
      ]),
      this.controller.updateItemByPk
    )

    // Delete item
    this.router.delete(
      '/:id',
      requestValidationRules([
        param('id')
          .exists()
          .withMessage(validators.ROLE_IS_EMPTY)
          .isInt()
          .withMessage(validators.ROLE_MUST_BE_INTEGER_TYPE)
      ]),
      this.controller.deleteItemByPk
    )
  }
}

export default new ProductRoute().router
