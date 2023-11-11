import { Router } from 'express'
import { body, param } from 'express-validator'
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
        body('productID')
          .notEmpty()
          .withMessage('This field can not empty!')
          .isInt()
          .withMessage('This field must be Integer type!'),
        body('dateImported')
          .notEmpty()
          .withMessage('This field can not empty!')
          .isString()
          .withMessage('This field must be Date type!')
      ]),
      this.controller.createNewItem
    )

    // Get item by productID and importedID
    this.router.get(
      '/:id',
      requestValidationRules([
        param('id')
          .notEmpty()
          .withMessage('This field can not empty!')
          .isInt()
          .withMessage('This field must be Integer type!')
      ]),
      this.controller.getItemByID
    )

    // Get all items
    this.router.post('/find', this.controller.getAllItems)

    // Update item by productID and importedID
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

    // Delete item by productID
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

export default new ImportationRoute().router