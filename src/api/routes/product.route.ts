import { Router } from 'express'
import ProductController from '~/controllers/product.controller'

class ProductRoute {
  router = Router()
  controller = new ProductController()

  constructor() {
    this.initialize()
  }

  private initialize() {
    this.router.post('/find', this.controller.createNewItem)
    this.router.get('/find/:id', this.controller.getItemByID)
    this.router.get('/find', this.controller.getAllItems)
    this.router.put('/:id', this.controller.updateItemByID)
    this.router.delete('/:id', this.controller.deleteItemByID)
  }
}

export default new ProductRoute().router
