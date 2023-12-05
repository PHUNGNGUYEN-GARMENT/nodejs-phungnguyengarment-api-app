import { Router } from 'express'
import { body, param, query } from 'express-validator'
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
          .withMessage('This field must be String type!'),
        body('status')
          .notEmpty()
          .withMessage('This field can not empty!')
          .isString()
          .withMessage('This field must be String type!')
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
      this.controller.getItemByID
    )

    // Get item
    this.router.get(
      '/name',
      requestValidationRules([
        query('name')
          .exists()
          .withMessage('This field can not empty!')
          .isString()
          .withMessage('This field must be String type!')
      ]),
      this.controller.getItemByName
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
      '/:id',
      requestValidationRules([
        param('id')
          .exists()
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
          .exists()
          .withMessage('This field can not empty!')
          .isInt()
          .withMessage('This field must be Integer type!')
      ]),
      this.controller.deleteItemByID
    )
  }
}

export default new GroupRoute().router
