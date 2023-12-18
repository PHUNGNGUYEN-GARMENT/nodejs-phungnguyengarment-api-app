import { Request, Response } from 'express'
import { PrintablePlace } from '~/models/printable-place.model'
import * as service from '~/services/printable-place.service'
import { RequestBodyType } from '~/type'
import { message } from '../utils/constant'

const NAMESPACE = 'controllers/product-color'

export default class ProductColorController {
  constructor() {}

  createNewItem = async (req: Request, res: Response) => {
    const itemRequest: PrintablePlace = {
      printID: Number(req.body.printID),
      productID: Number(req.body.productID),
      status: req.body.status ?? 'active'
    }
    try {
      const itemNew = await service.createNewItem(itemRequest)

      if (itemNew) {
        return res.formatter.created({ data: itemNew, message: message.CREATED })
      }
      return res.formatter.badRequest({ message: message.CREATION_FAILED })
    } catch (error) {
      return res.formatter.badRequest({ message: message.ERROR })
    }
  }

  createOrUpdateItemByPk = async (req: Request, res: Response) => {
    const itemRequest: PrintablePlace = {
      id: Number(req.body.id),
      productID: req.body.productID,
      printID: req.body.printID,
      status: req.body.status
    }
    try {
      const itemFound = await service.getItemByPk(itemRequest.id!)
      if (itemFound) {
        const itemUpdated = await service.updateItemByPk(itemRequest.id!, itemRequest)
        if (itemUpdated) {
          return res.formatter.ok({ data: itemUpdated, message: message.UPDATED })
        } else {
          return res.formatter.badRequest({ message: message.UPDATE_FAILED })
        }
      } else {
        const itemCreated = await service.createNewItem(itemRequest)
        if (itemCreated) {
          return res.formatter.created({ data: itemCreated, message: message.CREATED })
        } else {
          return res.formatter.badRequest({ message: message.CREATION_FAILED })
        }
      }
    } catch (error) {
      return res.formatter.badRequest({ message: message.ERROR })
    }
  }

  createOrUpdateItemByProductID = async (req: Request, res: Response) => {
    const itemRequest: PrintablePlace = {
      productID: Number(req.params.productID),
      printID: req.body.printID,
      status: req.body.status
    }
    try {
      const itemFound = await service.getItemBy({ productID: itemRequest.productID! })
      if (itemFound) {
        const itemUpdated = await service.updateItemByProductID(itemRequest.productID!, itemRequest)
        if (itemUpdated) {
          return res.formatter.ok({ data: itemUpdated, message: message.UPDATED })
        } else {
          return res.formatter.badRequest({ message: message.UPDATE_FAILED })
        }
      } else {
        const itemCreated = await service.createNewItem(itemRequest)
        if (itemCreated) {
          return res.formatter.created({ data: itemCreated, message: message.CREATED })
        } else {
          return res.formatter.badRequest({ message: message.CREATION_FAILED })
        }
      }
    } catch (error) {
      return res.formatter.badRequest({ message: message.ERROR })
    }
  }

  createOrUpdateItemByPrintID = async (req: Request, res: Response) => {
    const itemRequest: PrintablePlace = {
      printID: Number(req.params.printID),
      productID: req.body.productID,
      status: req.body.status
    }
    try {
      const itemFound = await service.getItemBy({ printID: itemRequest.printID! })
      if (itemFound) {
        const itemUpdated = await service.updateItemByPrintID(itemRequest.printID!, itemRequest)
        if (itemUpdated) {
          return res.formatter.ok({ data: itemUpdated, message: message.UPDATED })
        } else {
          return res.formatter.badRequest({ message: message.UPDATE_FAILED })
        }
      } else {
        const itemCreated = await service.createNewItem(itemRequest)
        if (itemCreated) {
          return res.formatter.created({ data: itemCreated, message: message.CREATED })
        } else {
          return res.formatter.badRequest({ message: message.CREATION_FAILED })
        }
      }
    } catch (error) {
      return res.formatter.badRequest({ message: message.ERROR })
    }
  }

  getItemByPk = async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    try {
      const item = await service.getItemByPk(id)
      if (item) {
        return res.formatter.ok({ data: item, message: message.SUCCESS })
      } else {
        return res.formatter.notFound({ data: item, message: message.NOT_FOUND })
      }
    } catch (error) {
      return res.formatter.badRequest({ message: message.ERROR })
    }
  }

  getItemByProductID = async (req: Request, res: Response) => {
    const productID = Number(req.params.productID)
    try {
      const item = await service.getItemBy({ productID: productID })
      if (item) {
        return res.formatter.ok({ data: item, message: message.SUCCESS })
      } else {
        return res.formatter.notFound({ data: item, message: message.NOT_FOUND })
      }
    } catch (error) {
      return res.formatter.badRequest({ message: message.ERROR })
    }
  }

  getItemByPrintID = async (req: Request, res: Response) => {
    const printID = Number(req.params.printID)
    try {
      const item = await service.getItemBy({ printID: printID })
      if (item) {
        return res.formatter.ok({ data: item, message: message.SUCCESS })
      } else {
        return res.formatter.notFound({ data: item, message: message.NOT_FOUND })
      }
    } catch (error) {
      return res.formatter.badRequest({ message: message.ERROR })
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
      return res.formatter.badRequest({ message: message.ERROR })
    }
  }

  updateItemByPk = async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const itemRequest: PrintablePlace = {
      printID: req.body.printID,
      productID: req.body.productID,
      status: req.body.status
    }
    try {
      const itemUpdated = await service.updateItemByPk(id, itemRequest)
      if (itemUpdated) {
        return res.formatter.ok({ data: itemUpdated, message: message.UPDATED })
      }
      return res.formatter.badRequest({ message: message.UPDATE_FAILED })
    } catch (error) {
      return res.formatter.badRequest({ message: message.ERROR })
    }
  }

  updateItemByProductID = async (req: Request, res: Response) => {
    const productID = Number(req.params.productID)
    const itemRequest: PrintablePlace = {
      printID: req.body.printID,
      status: req.body.status
    }
    try {
      const itemUpdated = await service.updateItemByProductID(productID, itemRequest)
      if (itemUpdated) {
        return res.formatter.ok({ data: itemUpdated, message: message.UPDATED })
      }
      return res.formatter.badRequest({ message: message.UPDATE_FAILED })
    } catch (error) {
      return res.formatter.badRequest({ message: message.ERROR })
    }
  }

  updateItemByPrintID = async (req: Request, res: Response) => {
    const printID = Number(req.params.printID)
    const itemRequest: PrintablePlace = {
      productID: req.body.productID,
      status: req.body.status
    }
    try {
      const itemUpdated = await service.updateItemByPrintID(printID, itemRequest)
      if (itemUpdated) {
        return res.formatter.ok({ data: itemUpdated, message: message.UPDATED })
      }
      return res.formatter.badRequest({ message: message.UPDATE_FAILED })
    } catch (error) {
      return res.formatter.badRequest({ message: message.ERROR })
    }
  }

  deleteItemByPk = async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    try {
      const itemUpdated = await service.deleteItemByPk(id)
      if (itemUpdated) {
        return res.formatter.ok({ data: itemUpdated, message: message.DELETED })
      }
      return res.formatter.badRequest({ message: message.DELETE_FAILED })
    } catch (error) {
      return res.formatter.badRequest({ message: message.ERROR })
    }
  }

  deleteItemByProductID = async (req: Request, res: Response) => {
    const productID = Number(req.params.productID)
    try {
      const itemUpdated = await service.deleteItemByProductID(productID)
      if (itemUpdated) {
        return res.formatter.ok({ data: itemUpdated, message: message.DELETED })
      }
      return res.formatter.badRequest({ message: message.DELETE_FAILED })
    } catch (error) {
      return res.formatter.badRequest({ message: message.ERROR })
    }
  }

  deleteItemByPrintID = async (req: Request, res: Response) => {
    const printID = Number(req.params.printID)
    try {
      const itemUpdated = await service.deleteItemByPrintID(printID)
      if (itemUpdated) {
        return res.formatter.ok({ data: itemUpdated, message: message.DELETED })
      }
      return res.formatter.badRequest({ message: message.DELETE_FAILED })
    } catch (error) {
      return res.formatter.badRequest({ message: message.ERROR })
    }
  }
}
