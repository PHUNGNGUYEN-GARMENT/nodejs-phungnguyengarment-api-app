import { Router } from 'express'
import GarmentAccessoryController from '~/controllers/garment-accessory.controller'
import { validationRules } from '../middleware/request-validator'

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
      validationRules([
        { field: 'productID', fieldType: 'int', location: 'body' },
        { field: 'cuttingAccessoryDate', fieldType: 'date', location: 'body' },
        { field: 'amountCuttingAccessory', fieldType: 'float', location: 'body' }
      ]),
      this.controller.createNewItem
    )

    // Get item
    this.router.get(
      '/:id',
      validationRules([{ field: 'id', fieldType: 'int', location: 'params' }]),
      this.controller.getItemByPk
    )

    this.router.get(
      '/productID/:productID',
      validationRules([{ field: 'productID', fieldType: 'int', location: 'params' }]),
      this.controller.getItemByProductID
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
      this.controller.getItems
    )

    // Update item by id
    this.router.put(
      '/:id',
      validationRules([{ field: 'id', fieldType: 'int', location: 'params' }]),
      this.controller.updateItemByPk
    )

    this.router.put(
      '/productID/:productID',
      validationRules([{ field: 'productID', fieldType: 'int', location: 'params' }]),
      this.controller.updateItemByProductID
    )

    // Delete item
    this.router.delete(
      '/:id',
      validationRules([{ field: 'id', fieldType: 'int', location: 'params' }]),
      this.controller.deleteItemByPk
    )

    this.router.delete(
      '/productID/:productID',
      validationRules([{ field: 'productID', fieldType: 'int', location: 'params' }]),
      this.controller.deleteItemByProductID
    )
  }
}

export default new GarmentAccessoryRoute().router
