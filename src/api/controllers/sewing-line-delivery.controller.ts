import { Request, Response } from 'express'
import { SewingLineDelivery } from '~/models/sewing-line-delivery.model'
import * as service from '~/services/sewing-line-delivery.service'

const NAMESPACE = 'SewingLineDelivery'
const PATH = 'controllers/sewing-line-delivery'

export default class SewingLineDeliveryController {
  constructor() {}

  createNewItem = async (req: Request, res: Response) => {
    const itemRequest: SewingLineDelivery = {
      sewingLine: req.body.sewingLine
    }
    try {
      const itemNew = await service.createNew(itemRequest)

      if (itemNew) {
        return res.formatter.created({ data: itemNew })
      } else {
        return res.formatter.badRequest({ message: `${NAMESPACE} already exists` })
      }
    } catch (error) {
      return res.formatter.badRequest({ message: `${error}` })
    }
  }

  getItemByID = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
      const item = await service.getByID(parseInt(id))
      if (item) {
        return res.formatter.ok({ data: item })
      }
      return res.formatter.notFound({})
    } catch (error) {
      return res.formatter.badRequest({ message: `${error}` })
    }
  }

  getAllItems = async (req: Request, res: Response) => {
    try {
      const items = await service.getAll()
      return res.formatter.ok({ data: items })
    } catch (error) {
      return res.formatter.badRequest({ message: `${error}` })
    }
  }

  updateItemByID = async (req: Request, res: Response) => {
    const itemRequest: SewingLineDelivery = {
      sewingLineDeliveryID: parseInt(req.params.id),
      sewingLine: req.body.sewingLine,
      orderNumber: req.body.orderNumber
    }
    try {
      const itemUpdated = await service.updateByID(itemRequest)
      if (itemUpdated) {
        return res.formatter.ok({ data: itemUpdated })
      }
      return res.formatter.badRequest({})
    } catch (error) {
      return res.formatter.badRequest({ message: `${error}` })
    }
  }

  deleteItemByID = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
      const item = await service.deleteByID(parseInt(id))
      if (item) {
        return res.formatter.ok({ message: `${NAMESPACE} has been deleted` })
      }
      return res.formatter.notFound({})
    } catch (error) {
      return res.formatter.badRequest({ message: `${error}` })
    }
  }
}
