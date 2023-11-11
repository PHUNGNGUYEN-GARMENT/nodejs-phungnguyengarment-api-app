import { Router } from 'express'
import { body, param } from 'express-validator'
import GroupController from '~/controllers/group.controller'
import { requestValidationRules } from '~/middleware/response-validator'

class GroupRoute {
  router = Router()
  controller = new GroupController()

  constructor() {
    this.initialize()
  }

  private initialize() {
    // Create new item
    this.router.post(
      '/',
      requestValidationRules([
        body('name')
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

export default new GroupRoute().router
