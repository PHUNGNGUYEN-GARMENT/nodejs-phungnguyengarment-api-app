import { Router } from 'express'
import { body, param } from 'express-validator'
import ImportedLotController from '~/controllers/imported-lot.controller'
import { requestValidationRules } from '~/middleware/response-validator'

class ImportedLotRoute {
  router = Router()
  controller = new ImportedLotController()

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
        body('importedID')
          .notEmpty()
          .withMessage('This field can not empty!')
          .isInt()
          .withMessage('This field must be Integer type!'),
        body('quantity')
          .notEmpty()
          .withMessage('This field can not empty!')
          .isFloat()
          .withMessage('This field must be Number type!'),
        body('unit')
          .notEmpty()
          .withMessage('This field can not empty!')
          .isString()
          .withMessage('This field must be String type!')
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

export default new ImportedLotRoute().router
