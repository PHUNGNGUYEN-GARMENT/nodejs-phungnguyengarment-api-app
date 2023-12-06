import { Router } from 'express'
import { body, param, query } from 'express-validator'
import ImportationController from '~/controllers/importation.controller'
import { requestValidationRules } from '~/middleware/response-validator'

class ImportationRoute {
  router = Router()
  controller = new ImportationController()

  constructor() {
    this.initialize()
  }

  private initialize() {
    // Create new item
    this.router.post(
      '/',
      requestValidationRules([
        body('dateImported')
          .notEmpty()
          .withMessage('This field can not empty!')
          .isString()
          .withMessage('This field must be String type!'),
        body('productID')
          .notEmpty()
          .withMessage('This field can not empty!')
          .isInt()
          .withMessage('This field must be Integer type!'),
        body('status')
          .notEmpty()
          .withMessage('This field can not empty!')
          .isString()
          .withMessage('This field must be String type!'),
        body('quantity')
          .notEmpty()
          .withMessage('This field can not empty!')
          .isFloat()
          .withMessage('This field must be Float type!')
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
      this.controller.getItemByPk
    )

    // Get item
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

    // Get all items
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

    // Update item by productID and importedID
    this.router.put(
      '/id/:id',
      requestValidationRules([
        param('id')
          .exists()
          .withMessage('This field can not empty!')
          .isInt()
          .withMessage('This field must be Integer type!')
      ]),
      this.controller.updateItemByID
    )

    // Update item by productID and importedID
    this.router.put(
      '/productID/:id',
      requestValidationRules([
        param('id')
          .exists()
          .withMessage('This field can not empty!')
          .isInt()
          .withMessage('This field must be Integer type!')
      ]),
      this.controller.updateItemByProductID
    )

    // Delete item by productID
    this.router.delete(
      '/:id',
      requestValidationRules([
        param('id')
          .exists()
          .withMessage('This field can not empty!')
          .isInt()
          .withMessage('This field must be Integer type!')
      ]),
      this.controller.deleteItemByID
    )
  }
}

export default new ImportationRoute().router
