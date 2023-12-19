import { Router } from 'express'
import GarmentAccessoryNoteController from '~/controllers/garment-accessory-note.controller'
import { validationRules } from '../middleware/request-validator'

class GarmentAccessoryNoteRoute {
  router = Router()
  controller = new GarmentAccessoryNoteController()

  constructor() {
    this.initialize()
  }

  private initialize() {
    // Create new item
    this.router.post(
      '/',
      validationRules([
        { field: 'accessoryNoteID', fieldType: 'int', location: 'body' },
        { field: 'garmentAccessoryID', fieldType: 'int', location: 'body' }
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
      '/accessoryNoteID/:accessoryNoteID',
      validationRules([{ field: 'accessoryNoteID', fieldType: 'int', location: 'body' }]),
      this.controller.getItemByAccessoryNoteID
    )

    this.router.get(
      '/garmentAccessoryID/:garmentAccessoryID',
      validationRules([{ field: 'garmentAccessoryID', fieldType: 'int', location: 'body' }]),
      this.controller.getItemByGarmentAccessoryID
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
      '/accessoryNoteID/:accessoryNoteID',
      validationRules([
        { field: 'accessoryNoteID', fieldType: 'int', location: 'params' },
        { field: 'garmentAccessoryID', fieldType: 'int', location: 'body' }
      ]),
      this.controller.updateItemByAccessoryNoteID
    )

    this.router.put(
      '/garmentAccessoryID/:garmentAccessoryID',
      validationRules([
        { field: 'garmentAccessoryID', fieldType: 'int', location: 'params' },
        { field: 'accessoryNoteID', fieldType: 'int', location: 'body' }
      ]),
      this.controller.updateItemByGarmentAccessoryID
    )

    // Delete item
    this.router.delete(
      '/:id',
      validationRules([{ field: 'id', fieldType: 'int', location: 'params' }]),
      this.controller.deleteItemByPk
    )

    this.router.delete(
      '/accessoryNoteID/:accessoryNoteID',
      validationRules([{ field: 'accessoryNoteID', fieldType: 'int', location: 'params' }]),
      this.controller.deleteItemByAccessoryNoteID
    )

    this.router.delete(
      '/garmentAccessoryID/:garmentAccessoryID',
      validationRules([{ field: 'garmentAccessoryID', fieldType: 'int', location: 'params' }]),
      this.controller.deleteItemByGarmentAccessoryID
    )
  }
}

export default new GarmentAccessoryNoteRoute().router
