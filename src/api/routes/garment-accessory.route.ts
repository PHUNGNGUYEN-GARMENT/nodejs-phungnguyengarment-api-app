import { Router } from 'express'
import { body, param } from 'express-validator'
import GarmentAccessoryController from '~/controllers/garment-accessory.controller'
import { requestValidationRules } from '~/middleware/response-validator'

class GarmentAccessoryRoute {
  router = Router()
  controller = new GarmentAccessoryController()

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
          .withMessage('This field must be Integer type!')
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
      '/',
      requestValidationRules([
        body('garmentAccessoryID')
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

export default new GarmentAccessoryRoute().router
