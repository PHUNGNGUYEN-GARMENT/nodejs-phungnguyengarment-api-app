import { Request, Response } from 'express'
import { Color } from '~/models/color.model'
import * as service from '~/services/color.service'

const NAMESPACE = 'Color'
const PATH = 'controllers/color'

export default class ColorController {
  constructor() {}

  createNewItem = async (req: Request, res: Response) => {
    const itemRequest: Color = {
      nameColor: req.body.nameColor,
      hexColor: req.body.hexColor
    }
    try {
      const itemNew = await service.createNew(itemRequest)

      if (itemNew) {
        return res.formatter.created({ data: itemNew })
      } else {
        return res.formatter.badRequest({ message: `${NAMESPACE} already exists` })
      }
    } catch (error) {
      return res.formatter.badRequest({ message: `>>> ${error}` })
    }
  }

  getItemByID = async (req: Request, res: Response) => {
    const { id } = req.query
    try {
      const item = await service.getByID(Number(id))
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
    const itemRequest: Color = {
      colorID: req.body.colorID, // Using for find item (not update)
      nameColor: req.body.nameColor,
      hexColor: req.body.hexColor,
      createdAt: req.body.createdAt,
      updatedAt: req.body.updatedAt,
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
