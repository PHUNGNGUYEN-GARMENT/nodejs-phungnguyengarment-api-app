import { Router } from 'express'
import { body, param } from 'express-validator'
import ProductController from '~/controllers/product.controller'
import { requestValidationRules } from '~/middleware/response-validator'
import { defaultRequestBodyValidator } from '../middleware/request-validator'

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
          .withMessage('This field can not empty!')
          .isString()
          .withMessage('This field must be string type!'),
        body('quantityPO')
          .exists()
          .withMessage('This field can not empty!')
          .isFloat()
          .withMessage('This field must be number type!'),
        body('dateInputNPL')
          .exists()
          .withMessage('This field can not empty!')
          .isString()
          .withMessage('This field must be string type!'),
        body('dateOutputFCR')
          .exists()
          .withMessage('This field can not empty!')
          .isString()
          .withMessage('This field must be string type!'),
        body('status')
          .exists()
          .withMessage('This field can not empty!')
          .isString()
          .withMessage('This field must be string type!')
      ]),
      this.controller.createNewItem
    )

    // Get item
    this.router.post('/find', defaultRequestBodyValidator(), this.controller.getItems)

    // Update item by id
    this.router.put(
      '/:id',
      requestValidationRules([
        param('id')
          .notEmpty()
          .withMessage('This field can not empty!')
          .isInt()
          .withMessage('This field must be Integer type!')
      ]),
      this.controller.updateItemByID
    )

    // Delete item
    this.router.delete(
      '/:id',
      requestValidationRules([
        param('id')
          .notEmpty()
          .withMessage('This field can not empty!')
          .isInt()
          .withMessage('This field must be Integer type!')
      ]),
      this.controller.deleteItemByID
    )
  }
}

export default new ProductRoute().router
