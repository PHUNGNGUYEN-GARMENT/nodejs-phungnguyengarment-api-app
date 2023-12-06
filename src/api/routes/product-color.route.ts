import { Router } from 'express'
import { body, param, query } from 'express-validator'
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
        body('colorID')
          .exists()
          .withMessage('This field can not empty!')
          .isInt()
          .withMessage('This field must be Integer type!'),
        body('productID')
          .exists()
          .withMessage('This field can not empty!')
          .isInt()
          .withMessage('This field must be Integer type!')
      ]),
      this.controller.createNewItem
    )

    // Get item
    this.router.get(
      '/id',
      requestValidationRules([
        query('id')
          .exists()
          .withMessage('This field can not empty!')
          .isInt()
          .withMessage('This field must be Integer type!')
      ]),
      this.controller.getItemBy
    )

    this.router.get(
      '/productID',
      requestValidationRules([
        query('productID')
          .exists()
          .withMessage('This field can not empty!')
          .isInt()
          .withMessage('This field must be Integer type!')
      ]),
      this.controller.getItemBy
    )

    this.router.get(
      '/colorID',
      requestValidationRules([
        query('colorID')
          .exists()
          .withMessage('This field can not empty!')
          .isInt()
          .withMessage('This field must be Integer type!')
      ]),
      this.controller.getItemBy
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
      this.controller.updateItemBy
    )

    // Update item by id
    this.router.put(
      '/:colorID',
      requestValidationRules([
        param('colorID')
          .exists()
          .withMessage('This field can not empty!')
          .isInt()
          .withMessage('This field must be Integer type!')
      ]),
      this.controller.updateItemBy
    )

    // Update item by id
    this.router.put(
      '/:productID',
      requestValidationRules([
        param('productID')
          .exists()
          .withMessage('This field can not empty!')
          .isInt()
          .withMessage('This field must be Integer type!')
      ]),
      this.controller.updateItemBy
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
      this.controller.deleteItemBy
    )

    this.router.delete(
      '/:productID',
      requestValidationRules([
        param('productID')
          .exists()
          .withMessage('This field can not empty!')
          .isInt()
          .withMessage('This field must be Integer type!')
      ]),
      this.controller.deleteItemBy
    )

    this.router.delete(
      '/:colorID',
      requestValidationRules([
        param('colorID')
          .exists()
          .withMessage('This field can not empty!')
          .isInt()
          .withMessage('This field must be Integer type!')
      ]),
      this.controller.deleteItemBy
    )
  }
}

export default new ProductColorRoute().router
