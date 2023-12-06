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
      status: req.body.status
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

  getItemByPk = async (req: Request, res: Response) => {
    const id = Number(req.query.id)
    try {
      const item = await service.getItemByPk(id)
      if (item) {
        return res.formatter.ok({ data: item })
      }
      return res.formatter.notFound({})
    } catch (error) {
      return res.formatter.badRequest({ message: `${error}` })
    }
  }

  getItemByProductID = async (req: Request, res: Response) => {
    const productID = Number(req.query.productID)
    try {
      const item = await service.getItemBy({ productID: productID })
      if (item) {
        return res.formatter.ok({ data: item })
      }
      return res.formatter.notFound({})
    } catch (error) {
      return res.formatter.badRequest({ message: `${error}` })
    }
  }

  getItemByColorID = async (req: Request, res: Response) => {
    const colorID = Number(req.query.colorID)
    try {
      const item = await service.getItemBy({ colorID: colorID })
      if (item) {
        return res.formatter.ok({ data: item })
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
    const itemRequest: ProductColor = {
      colorID: req.body.colorID,
      productID: req.body.productID,
      status: req.body.status,
      orderNumber: req.body.orderNumber
    }
    try {
      const itemUpdated = await service.updateItemByID(id, itemRequest)
      if (itemUpdated) {
        return res.formatter.ok({ data: itemUpdated })
      }
      return res.formatter.badRequest({})
    } catch (error) {
      return res.formatter.badRequest({ message: `${error}` })
    }
  }

  deleteItemBy = async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    try {
      const itemUpdated = await service.deleteItemByID(id)
      if (itemUpdated) {
        return res.formatter.ok({ data: itemUpdated })
      }
      return res.formatter.badRequest({})
    } catch (error) {
      return res.formatter.badRequest({ message: `${error}` })
    }
  }
}
