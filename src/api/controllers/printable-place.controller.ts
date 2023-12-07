import { Request, Response } from 'express'
import { PrintablePlace } from '~/models/printable-place.model'
import * as service from '~/services/printable-place.service'
import { RequestBodyType } from '~/type'

const NAMESPACE = 'controllers/product-color'

export default class ProductColorController {
  constructor() {}

  createNewItem = async (req: Request, res: Response) => {
    const itemRequest: PrintablePlace = {
      printID: req.body.printID,
      productID: req.body.productID,
      name: req.body.name,
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

  getItemByPrintID = async (req: Request, res: Response) => {
    const printID = Number(req.params.printID)
    try {
      const item = await service.getItemBy({ printID: printID })
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
    const itemRequest: PrintablePlace = {
      printID: req.body.printID,
      productID: req.body.productID,
      name: req.body.name,
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
    const itemRequest: PrintablePlace = {
      printID: req.body.printID,
      name: req.body.name,
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

  updateItemByPrintID = async (req: Request, res: Response) => {
    const printID = Number(req.params.printID)
    const itemRequest: PrintablePlace = {
      productID: req.body.productID,
      name: req.body.name,
      status: req.body.status
    }
    try {
      const itemUpdated = await service.updateItemByPrintID(printID, itemRequest)
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

  deleteItemByPrintID = async (req: Request, res: Response) => {
    const printID = Number(req.params.printID)
    try {
      const itemUpdated = await service.deleteItemByPrintID(printID)
      if (itemUpdated) {
        return res.formatter.ok({ data: itemUpdated })
      }
      return res.formatter.badRequest({})
    } catch (error) {
      return res.formatter.badRequest({ message: `${error}` })
    }
  }
}
