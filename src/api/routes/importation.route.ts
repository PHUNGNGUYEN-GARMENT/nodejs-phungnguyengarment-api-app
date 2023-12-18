import { Router } from 'express'
import { body, param } from 'express-validator'
import ImportationController from '~/controllers/importation.controller'
import { requestValidationRules } from '~/middleware/response-validator'
import { validators } from '../utils/constant'

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
          .exists()
          .withMessage(validators.ROLE_IS_EMPTY)
          .isInt()
          .withMessage(validators.ROLE_MUST_BE_INTEGER_TYPE),
        body('quantity')
          .exists()
          .withMessage(validators.ROLE_IS_EMPTY)
          .isFloat()
          .withMessage(validators.ROLE_MUST_BE_FLOAT_TYPE),
        body('dateImported')
          .exists()
          .withMessage(validators.ROLE_IS_EMPTY)
          .isString()
          .withMessage(validators.ROLE_MUST_BE_STRING_TYPE)
      ]),
      this.controller.createNewItem
    )

    this.router.post(
      '/createOrUpdate/:id',
      requestValidationRules([
        param('id')
          .exists()
          .withMessage(validators.ROLE_IS_EMPTY)
          .isInt()
          .withMessage(validators.ROLE_MUST_BE_INTEGER_TYPE),
        body('productID')
          .exists()
          .withMessage(validators.ROLE_IS_EMPTY)
          .isInt()
          .withMessage(validators.ROLE_MUST_BE_INTEGER_TYPE),
        body('quantity')
          .exists()
          .withMessage(validators.ROLE_IS_EMPTY)
          .isFloat()
          .withMessage(validators.ROLE_MUST_BE_FLOAT_TYPE),
        body('dateImported')
          .exists()
          .withMessage(validators.ROLE_IS_EMPTY)
          .isString()
          .withMessage(validators.ROLE_MUST_BE_STRING_TYPE)
      ]),
      this.controller.createOrUpdateItemByPk
    )

    this.router.post(
      '/createOrUpdate/:productID',
      requestValidationRules([
        param('productID')
          .exists()
          .withMessage(validators.ROLE_IS_EMPTY)
          .isInt()
          .withMessage(validators.ROLE_MUST_BE_INTEGER_TYPE),
        body('quantity')
          .exists()
          .withMessage(validators.ROLE_IS_EMPTY)
          .isFloat()
          .withMessage(validators.ROLE_MUST_BE_FLOAT_TYPE),
        body('dateImported')
          .exists()
          .withMessage(validators.ROLE_IS_EMPTY)
          .isString()
          .withMessage(validators.ROLE_MUST_BE_STRING_TYPE)
      ]),
      this.controller.createOrUpdateItemByProductID
    )

    // Get item
    this.router.get(
      '/:id',
      requestValidationRules([
        param('id')
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

    // Update item by productID and importedID
    this.router.put(
      '/productID/:productID',
      requestValidationRules([
        param('productID')
          .exists()
          .withMessage(validators.ROLE_IS_EMPTY)
          .isInt()
          .withMessage(validators.ROLE_MUST_BE_INTEGER_TYPE)
      ]),
      this.controller.updateItemByProductID
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
      this.controller.deleteItemByProductID
    )
  }
}

export default new ImportationRoute().router
