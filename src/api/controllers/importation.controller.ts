import { Request, Response } from 'express'
import { Importation } from '~/models/importation.model'
import * as service from '~/services/importation.service'

const NAMESPACE = 'Importation'
const PATH = 'controllers/importation'

export default class ImportedLotController {
  constructor() {}

  createNewItem = async (req: Request, res: Response) => {
    const itemRequest: Importation = {
      productID: req.body.productID,
      dateImported: req.body.dateImported
    }
    try {
      const itemNew = await service.createNew(itemRequest)

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
      const item = await service.getByID(parseInt(id))
      if (item) {
        return res.formatter.ok({ status: 200, data: item })
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
    const itemRequest: Importation = {
      importedID: parseInt(req.params.id),
      productID: req.body.productID,
      dateImported: req.body.dateImported,
      orderNumber: req.body.orderNumber
    }
    try {
      const itemUpdated = await service.updateByID(itemRequest)
      if (itemUpdated) {
        return res.formatter.ok({ status: 200, data: itemUpdated })
      }
      return res.formatter.badRequest({ status: 400 })
    } catch (error) {
      return res.formatter.badRequest({ status: 400, message: `${error}` })
    }
  }

  deleteItemByID = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
      const item = await service.deleteByID(parseInt(id))
      if (item) {
        return res.formatter.ok({ status: 200, message: `${NAMESPACE} has been deleted` })
      }
      return res.formatter.notFound({ status: 404 })
    } catch (error) {
      return res.formatter.badRequest({ status: 400, message: `${error}` })
    }
  }
}
