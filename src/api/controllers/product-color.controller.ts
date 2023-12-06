import { Request, Response } from 'express'
import { ProductColor } from '~/models/product-color.model'
import * as service from '~/services/product-color.service'
import { RequestBodyType } from '~/type'

const NAMESPACE = 'ProductColor'
const PATH = 'controllers/product-color'

export default class ProductColorController {
  constructor() {}

  createNewItem = async (req: Request, res: Response) => {
    const itemRequest: ProductColor = {
      productID: req.body.productID,
      colorID: req.body.colorID,
      status: 'active'
    }
    try {
      const itemNew = await service.createNewItem(itemRequest)

      if (itemNew) {
        return res.formatter.created({ data: itemNew })
      }
      return res.formatter.badRequest({ message: `${NAMESPACE} already exists` })
    } catch (error) {
      return res.formatter.badRequest({ message: `${error}` })
    }
  }

  getItemBy = async (req: Request, res: Response) => {
    const { productID, colorID } = req.params
    try {
      const item1 = await service.getItemBy({ productID: Number(productID) })
      if (item1) {
        return res.formatter.ok({ data: item1 })
      }
      const item2 = await service.getItemBy({ colorID: Number(colorID) })
      if (item2) {
        return res.formatter.ok({ data: item2 })
      }
      return res.formatter.notFound({})
    } catch (error) {
      return res.formatter.badRequest({ message: `${error}` })
    }
  }

  getItems = async (req: Request, res: Response) => {
    try {
      const bodyRequest: RequestBodyType = {
        ...req.body
      }
      const items = await service.getItems(bodyRequest)
      console.log('>>>', items)
      const total = await service.getItemsWithStatus(bodyRequest.filter.status)

      return res.formatter.ok({
        data: items.rows,
        length: items.count,
        page: Number(bodyRequest.paginator.page),
        total: bodyRequest.search.term.length > 0 ? items.count : total.length
      })
    } catch (error) {
      return res.formatter.badRequest({ message: `${error}` })
    }
  }

  updateItemBy = async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const colorID = Number(req.params.colorID)
    const productID = Number(req.params.productID)
    const itemRequest: ProductColor = {
      colorID: req.body.colorID,
      productID: req.body.productID,
      status: req.body.status,
      orderNumber: req.body.orderNumber
    }
    try {
      const itemUpdated1 = await service.updateItemByID(id, itemRequest)
      if (itemUpdated1) {
        return res.formatter.ok({ data: itemUpdated1 })
      }
      const itemUpdated2 = await service.updateItemByColorID(colorID, itemRequest)
      if (itemUpdated2) {
        return res.formatter.ok({ data: itemUpdated2 })
      }
      const itemUpdated3 = await service.updateItemByProductID(productID, itemRequest)
      if (itemUpdated3) {
        return res.formatter.ok({ data: itemUpdated3 })
      }
      return res.formatter.badRequest({})
    } catch (error) {
      return res.formatter.badRequest({ message: `${error}` })
    }
  }

  deleteItemBy = async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const colorID = Number(req.params.colorID)
    const productID = Number(req.params.productID)
    try {
      const itemUpdated1 = await service.deleteItemByID(id)
      if (itemUpdated1) {
        return res.formatter.ok({ data: itemUpdated1 })
      }
      const itemUpdated2 = await service.deleteItemByColorID(colorID)
      if (itemUpdated2) {
        return res.formatter.ok({ data: itemUpdated2 })
      }
      const itemUpdated3 = await service.deleteItemByProductID(productID)
      if (itemUpdated3) {
        return res.formatter.ok({ data: itemUpdated3 })
      }
      return res.formatter.badRequest({})
    } catch (error) {
      return res.formatter.badRequest({ message: `${error}` })
    }
  }
}
