import { Router } from 'express'
import ProductController from '~/controllers/product.controller'
import { checkRole, isAuthentication } from '../middleware/auth.middleware'
import { validationRules } from '../middleware/request-validator'

class ProductRoute {
  router = Router()
  controller = new ProductController()

  constructor() {
    this.initialize()
  }

  private initialize() {
    // Create new item
    this.router.post(
      '/',
      validationRules([
        { field: 'productCode', fieldType: 'string', location: 'body' },
        { field: 'quantityPO', fieldType: 'float', location: 'body' },
        { field: 'dateInputNPL', fieldType: 'date', location: 'body' },
        { field: 'dateOutputFCR', fieldType: 'date', location: 'body' }
      ]),
      [isAuthentication, checkRole(['admin', 'product_manager'])],
      this.controller.createNewItem
    )

    this.router.post(
      '/createOrUpdate/:id',
      validationRules([
        { field: 'id', fieldType: 'int', location: 'params' },
        { field: 'productCode', fieldType: 'string', location: 'body' },
        { field: 'quantityPO', fieldType: 'float', location: 'body' },
        { field: 'dateInputNPL', fieldType: 'date', location: 'body' },
        { field: 'dateOutputFCR', fieldType: 'date', location: 'body' }
      ]),
      [isAuthentication, checkRole(['admin', 'product_manager'])],
      this.controller.createOrUpdateItemByPk
    )

    // Get item
    this.router.get(
      '/:id',
      validationRules([{ field: 'id', fieldType: 'int', location: 'params' }]),
      [isAuthentication, checkRole(['admin', 'product_manager'])],
      this.controller.getItemByPk
    )

    this.router.get(
      '/productCode/:productCode',
      [isAuthentication, checkRole(['admin', 'product_manager'])],
      validationRules([{ field: 'productCode', fieldType: 'int', location: 'params' }]),
      this.controller.getItemByProductCode
    )

    // Get items
    this.router.post(
      '/find',
      validationRules([
        { field: 'filter', fieldType: 'object', location: 'body' },
        { field: 'paginator', fieldType: 'object', location: 'body' },
        { field: 'search', fieldType: 'object', location: 'body' },
        { field: 'sorting', fieldType: 'object', location: 'body' }
      ]),
      [isAuthentication, checkRole(['admin', 'product_manager'])],
      this.controller.getItems
    )

    // Update item by id
    this.router.put(
      '/:id',
      validationRules([{ field: 'id', fieldType: 'int', location: 'params' }]),
      [isAuthentication, checkRole(['admin', 'product_manager'])],
      this.controller.updateItemByPk
    )

    // Delete item
    this.router.delete(
      '/:id',
      validationRules([{ field: 'id', fieldType: 'int', location: 'params' }]),
      [isAuthentication, checkRole(['admin', 'product_manager'])],
      this.controller.deleteItemByPk
    )
  }
}

export default new ProductRoute().router
