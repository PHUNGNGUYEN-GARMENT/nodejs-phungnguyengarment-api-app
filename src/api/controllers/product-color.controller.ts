import { Request, Response } from 'express'
import { ProductColor } from '~/models/product-color.model'
import * as service from '~/services/product-color.service'
import { RequestBodyType } from '~/type'

const NAMESPACE = 'controllers/product-color'

export default class ProductColorController {
  constructor() {}

  createNewItem = async (req: Request, res: Response) => {
    const itemRequest: ProductColor = {
      colorID: req.body.colorID,
      productID: req.body.productID,
      productCode: req.body.productCode,
      nameColor: req.body.nameColor,
      hexColor: req.body.hexColor,
      status: req.body.status
    }
    try {
      const itemNew = await service.createNewItem(itemRequest)

      if (itemNew) {
        return res.formatter.created({ data: itemNew })
      }
      return res.formatter.badRequest({ message: `Failed to create new item` })
    } catch (error) {
      return res.formatter.badRequest({ message: `${error}` })
    }
  }

  getItemByPk = async (req: Request, res: Response) => {
    const id = Number(req.params.id)
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
    const productID = Number(req.params.productID)
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
    const colorID = Number(req.params.colorID)
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

  updateItemByPk = async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const itemRequest: ProductColor = {
      colorID: req.body.colorID,
      productID: req.body.productID,
      productCode: req.body.productCode,
      hexColor: req.body.hexColor,
      nameColor: req.body.nameColor,
      status: req.body.status
    }
    try {
      const itemUpdated = await service.updateItemByPk(id, itemRequest)
      if (itemUpdated) {
        return res.formatter.ok({ data: itemUpdated })
      }
      return res.formatter.badRequest({})
    } catch (error) {
      return res.formatter.badRequest({ message: `${error}` })
    }
  }

  updateItemByProductID = async (req: Request, res: Response) => {
    const productID = Number(req.params.productID)
    const itemRequest: ProductColor = {
      colorID: req.body.colorID,
      productCode: req.body.productCode,
      hexColor: req.body.hexColor,
      nameColor: req.body.nameColor,
      status: req.body.status
    }
    try {
      const itemUpdated = await service.updateItemByProductID(productID, itemRequest)
      if (itemUpdated) {
        return res.formatter.ok({ data: itemUpdated })
      }
      return res.formatter.badRequest({})
    } catch (error) {
      return res.formatter.badRequest({ message: `${error}` })
    }
  }

  updateItemByColorID = async (req: Request, res: Response) => {
    const colorID = Number(req.params.colorID)
    const itemRequest: ProductColor = {
      productID: req.body.productID,
      productCode: req.body.productCode,
      hexColor: req.body.hexColor,
      nameColor: req.body.nameColor,
      status: req.body.status
    }
    try {
      const itemUpdated = await service.updateItemByColorID(colorID, itemRequest)
      if (itemUpdated) {
        return res.formatter.ok({ data: itemUpdated })
      }
      return res.formatter.badRequest({})
    } catch (error) {
      return res.formatter.badRequest({ message: `${error}` })
    }
  }

  deleteItemByPk = async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    try {
      const itemUpdated = await service.deleteItemByPk(id)
      if (itemUpdated) {
        return res.formatter.ok({ data: itemUpdated })
      }
      return res.formatter.badRequest({})
    } catch (error) {
      return res.formatter.badRequest({ message: `${error}` })
    }
  }

  deleteItemByProductID = async (req: Request, res: Response) => {
    const productID = Number(req.params.productID)
    try {
      const itemUpdated = await service.deleteItemByProductID(productID)
      if (itemUpdated) {
        return res.formatter.ok({ data: itemUpdated })
      }
      return res.formatter.badRequest({})
    } catch (error) {
      return res.formatter.badRequest({ message: `${error}` })
    }
  }

  deleteItemByColorID = async (req: Request, res: Response) => {
    const colorID = Number(req.params.colorID)
    try {
      const itemUpdated = await service.deleteItemByColorID(colorID)
      if (itemUpdated) {
        return res.formatter.ok({ data: itemUpdated })
      }
      return res.formatter.badRequest({})
    } catch (error) {
      return res.formatter.badRequest({ message: `${error}` })
    }
  }
}
