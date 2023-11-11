import { Request, Response } from 'express'
import { ProductGroup } from '~/models/product-group.model'
import * as service from '~/services/product-group.service'

const NAMESPACE = 'ProductGroup'
const PATH = 'controllers/product-group'

export default class ProductGroupController {
  constructor() {}

  createNewItem = async (req: Request, res: Response) => {
    const itemRequest: ProductGroup = {
      groupID: req.body.groupID,
      productID: req.body.productID
    }
    try {
      const itemNew = await service.createNew(itemRequest)
      console.log('sa', itemNew)
      if (itemNew) {
        return res.formatter.created({ status: 201, data: itemNew })
      } else {
        return res.formatter.badRequest({ status: 400, message: `${NAMESPACE} already exists` })
      }
    } catch (error) {
      return res.formatter.badRequest({ status: 400, message: `${error}` })
    }
  }

  getItemByID = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
      const item1 = await service.getByGroupID(parseInt(id))
      const item2 = await service.getByProductID(parseInt(id))
      if (item1) {
        return res.formatter.ok({ status: 200, data: item1 })
      }
      if (item2) {
        return res.formatter.ok({ status: 200, data: item2 })
      }
      return res.formatter.notFound({ status: 404 })
    } catch (error) {
      return res.formatter.badRequest({ status: 400, message: `${error}` })
    }
  }

  getAllItems = async (req: Request, res: Response) => {
    try {
      const items = await service.getAll()
      return res.formatter.ok({ status: 200, data: items })
    } catch (error) {
      return res.formatter.badRequest({ status: 400, message: `${error}` })
    }
  }

  updateItemByID = async (req: Request, res: Response) => {
    const itemRequest: ProductGroup = {
      groupID: req.body.groupID,
      productID: req.body.productID,
      orderNumber: req.body.orderNumber
    }
    try {
      const itemUpdated1 = await service.updateByGroupID(itemRequest)
      const itemUpdated2 = await service.updateByProductID(itemRequest)
      if (itemUpdated1) {
        return res.formatter.ok({ status: 200, data: itemUpdated1 })
      }
      if (itemUpdated2) {
        return res.formatter.ok({ status: 200, data: itemUpdated2 })
      }
      return res.formatter.badRequest({ status: 400 })
    } catch (error) {
      return res.formatter.badRequest({ status: 400, message: `${error}` })
    }
  }

  deleteItemByID = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
      const item1 = await service.deleteByGroupID(parseInt(id))
      const item2 = await service.deleteByProductID(parseInt(id))
      if (item1) {
        return res.formatter.ok({ status: 200, message: `${NAMESPACE} has been deleted` })
      }
      if (item2) {
        return res.formatter.ok({ status: 200, message: `${NAMESPACE} has been deleted` })
      }
      return res.formatter.notFound({ status: 404 })
    } catch (error) {
      return res.formatter.badRequest({ status: 400, message: `${error}` })
    }
  }
}
