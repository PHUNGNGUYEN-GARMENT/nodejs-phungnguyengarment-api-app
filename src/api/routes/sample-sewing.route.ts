import { Router } from 'express'
import { body, param, query } from 'express-validator'
import { requestValidationRules } from '~/middleware/response-validator'
import SampleSewingController from '../controllers/sample-sewing.controller'
import { validators } from '../utils/constant'

class SampleSewingRoute {
  router = Router()
  controller = new SampleSewingController()

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
          .withMessage(validators.ROLE_IS_EMPTY)
          .isInt()
          .withMessage(validators.ROLE_MUST_BE_INTEGER_TYPE),
        body('sampleSewingData')
          .exists()
          .withMessage(validators.ROLE_IS_EMPTY)
          .isString()
          .withMessage(validators.ROLE_MUST_BE_STRING_TYPE),
        body('status')
          .exists()
          .withMessage(validators.ROLE_IS_EMPTY)
          .isString()
          .withMessage(validators.ROLE_MUST_BE_STRING_TYPE)
      ]),
      this.controller.createNewItem
    )

    // Get item
    this.router.get(
      '/id',
      requestValidationRules([
        query('id')
          .exists()
          .withMessage(validators.ROLE_IS_EMPTY)
          .isInt()
          .withMessage(validators.ROLE_MUST_BE_INTEGER_TYPE)
      ]),
      this.controller.getItemByPk
    )

    // Get item
    this.router.get(
      '/productID/:productID',
      requestValidationRules([
        param('productID')
          .exists()
          .withMessage(validators.ROLE_IS_EMPTY)
          .isInt()
          .withMessage(validators.ROLE_MUST_BE_INTEGER_TYPE)
      ]),
      this.controller.getItemByProductID
    )

    // Get all items
    this.router.post(
      '/find',
      requestValidationRules([
        body('filter')
          .exists()
          .withMessage(validators.ROLE_IS_EMPTY)
          .isObject()
          .withMessage(validators.ROLE_MUST_BE_OBJECT_TYPE),
        body('paginator')
          .exists()
          .withMessage(validators.ROLE_IS_EMPTY)
          .isObject()
          .withMessage(validators.ROLE_MUST_BE_OBJECT_TYPE),
        body('search')
          .exists()
          .withMessage(validators.ROLE_IS_EMPTY)
          .isObject()
          .withMessage(validators.ROLE_MUST_BE_OBJECT_TYPE),
        body('sorting')
          .exists()
          .withMessage(validators.ROLE_IS_EMPTY)
          .isObject()
          .withMessage(validators.ROLE_MUST_BE_OBJECT_TYPE)
      ]),
      this.controller.getItems
    )

    // Update item by productID and importedID
    this.router.put(
      '/:id',
      requestValidationRules([
        param('id')
          .exists()
          .withMessage(validators.ROLE_IS_EMPTY)
          .isInt()
          .withMessage(validators.ROLE_MUST_BE_INTEGER_TYPE)
      ]),
      this.controller.updateItemByPk
    )

    this.router.put(
      '/productID/:productID',
      requestValidationRules([
        param('productID')
          .exists()
          .withMessage(validators.ROLE_IS_EMPTY)
          .isInt()
          .withMessage(validators.ROLE_MUST_BE_INTEGER_TYPE)
      ]),
      this.controller.updateItemByPk
    )

    // Delete item by productID
    this.router.delete(
      '/:id',
      requestValidationRules([
        param('id')
          .exists()
          .withMessage(validators.ROLE_IS_EMPTY)
          .isInt()
          .withMessage(validators.ROLE_MUST_BE_INTEGER_TYPE)
      ]),
      this.controller.deleteItemByPk
    )

    this.router.delete(
      '/productID/:productID',
      requestValidationRules([
        param('productID')
          .exists()
          .withMessage(validators.ROLE_IS_EMPTY)
          .isInt()
          .withMessage(validators.ROLE_MUST_BE_INTEGER_TYPE)
      ]),
      this.controller.deleteItemByPk
    )
  }
}

export default new SampleSewingRoute().router
