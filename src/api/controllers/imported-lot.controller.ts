import { Request, Response } from 'express'
import { ImportedLot } from '~/models/imported-lot.model'
import * as service from '~/services/imported-lot.service'

const NAMESPACE = 'Product'
const PATH = 'controllers/product'

export default class ImportedLotController {
  constructor() {}

  createNewItem = async (req: Request, res: Response) => {
    const userRequest: ImportedLot = {
      productID: req.body.productID,
      importedID: req.body.importedID,
      quantity: req.body.quantity,
      unit: req.body.unit
    }
    try {
      const itemNew = await service.createNew(userRequest)

      if (itemNew) {
        return res.formatter.created({ status: 201, data: itemNew })
      } else {
        return res.formatter.badRequest({ status: 404, message: `${NAMESPACE} already exists` })
      }
    } catch (error) {
      return res.formatter.badRequest({ status: 400, message: `${error}` })
    }
  }

  getItemByID = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
      const item1 = await service.getByProductID(parseInt(id))
      const item2 = await service.getByImportedID(parseInt(id))
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
    const itemRequest: ImportedLot = {
      productID: req.body.productID,
      importedID: req.body.importedID,
      quantity: req.body.quantity,
      unit: req.body.unit,
      orderNumber: req.body.orderNumber
    }
    try {
      const itemUpdated1 = await service.updateByProductID(itemRequest)
      const itemUpdated2 = await service.updateByImportedID(itemRequest)
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
      const item1 = await service.deleteByProductID(parseInt(id))
      const item2 = await service.deleteByImportedID(parseInt(id))
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
