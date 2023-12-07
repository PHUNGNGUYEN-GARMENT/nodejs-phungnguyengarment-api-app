import { Router } from 'express'
import { body, param } from 'express-validator'
import ProductColorController from '~/controllers/product-color.controller'
import { requestValidationRules } from '~/middleware/response-validator'

class ProductColorRoute {
  router = Router()
  controller = new ProductColorController()

  constructor() {
    this.initialize()
  }

  private initialize() {
    // Create new item
    this.router.post(
      '/',
      requestValidationRules([
        body('productID')
          .exists()
          .withMessage('This field can not empty!')
          .isInt()
          .withMessage('This field must be Integer type!'),
        body('colorID')
          .exists()
          .withMessage('This field can not empty!')
          .isInt()
          .withMessage('This field must be Integer type!'),
        body('productCode')
          .exists()
          .withMessage('This field can not empty!')
          .isString()
          .withMessage('This field must be String type!'),
        body('nameColor')
          .exists()
          .withMessage('This field can not empty!')
          .isString()
          .withMessage('This field must be String type!'),
        body('hexColor')
          .exists()
          .withMessage('This field can not empty!')
          .isString()
          .withMessage('This field must be String type!'),
        body('status')
          .exists()
          .withMessage('This field can not empty!')
          .isString()
          .withMessage('This field must be String type!')
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
      '/productID/:productID',
      requestValidationRules([
        param('productID')
          .exists()
          .withMessage('This field can not empty!')
          .isInt()
          .withMessage('This field must be Integer type!')
      ]),
      this.controller.getItemByProductID
    )

    this.router.get(
      '/colorID/:colorID',
      requestValidationRules([
        param('colorID')
          .exists()
          .withMessage('This field can not empty!')
          .isInt()
          .withMessage('This field must be Integer type!')
      ]),
      this.controller.getItemByColorID
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
    this.router.put('/:id', this.controller.updateItemByPk)

    this.router.put('/productID/:productID', this.controller.updateItemByProductID)

    this.router.put('/colorID/:colorID', this.controller.updateItemByColorID)

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

    this.router.delete(
      '/productID/:productID',
      requestValidationRules([
        param('productID')
          .exists()
          .withMessage('This field can not empty!')
          .isInt()
          .withMessage('This field must be Integer type!')
      ]),
      this.controller.deleteItemByProductID
    )

    this.router.delete(
      '/colorID/:colorID',
      requestValidationRules([
        param('colorID')
          .exists()
          .withMessage('This field can not empty!')
          .isInt()
          .withMessage('This field must be Integer type!')
      ]),
      this.controller.deleteItemByColorID
    )
  }
}

export default new ProductColorRoute().router
