import { Router } from 'express'
import { body, param } from 'express-validator'
import ProductController from '~/controllers/product.controller'
import { requestValidationRules } from '~/middleware/response-validator'

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
    this.router.get(
      '/:id',
      requestValidationRules([
        param('id')
          .exists()
          .withMessage('This field can not empty!')
          .isInt()
          .withMessage('This field must be Integer type!')
      ]),
      this.controller.getItemByPk
    )

    this.router.get(
      '/productCode/:productCode',
      requestValidationRules([
        param('productCode')
          .exists()
          .withMessage('This field can not empty!')
          .isString()
          .withMessage('This field must be String type!')
      ]),
      this.controller.getItemByProductCode
    )

    // Get items
    this.router.post(
      '/find',
      requestValidationRules([
        body('filter')
          .exists()
          .withMessage('This field can not empty!')
          .isObject()
          .withMessage('This field must be object type!'),
        body('paginator')
          .exists()
          .withMessage('This field can not empty!')
          .isObject()
          .withMessage('This field must be object type!'),
        body('search')
          .exists()
          .withMessage('This field can not empty!')
          .isObject()
          .withMessage('This field must be object type!'),
        body('sorting')
          .exists()
          .withMessage('This field can not empty!')
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
          .withMessage('This field can not empty!')
          .isInt()
          .withMessage('This field must be Integer type!')
      ]),
      this.controller.updateItemByPk
    )

    // Delete item
    this.router.delete(
      '/:id',
      requestValidationRules([
        param('id')
          .exists()
          .withMessage('This field can not empty!')
          .isInt()
          .withMessage('This field must be Integer type!')
      ]),
      this.controller.deleteItemByPk
    )
  }
}

export default new ProductRoute().router
