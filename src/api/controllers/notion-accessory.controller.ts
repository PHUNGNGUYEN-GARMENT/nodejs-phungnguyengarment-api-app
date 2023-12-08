import { Request, Response } from 'express'
import { NotionAccessory } from '~/api/models/accessory-note.model'
import * as service from '~/services/notion-accessory.service'

const NAMESPACE = 'NotionAccessory'
const PATH = 'controllers/notion-accessory'

export default class NotionAccessoryController {
  constructor() {}

  createNewItem = async (req: Request, res: Response) => {
    const itemRequest: NotionAccessory = {
      accessoryNoteID: req.body.accessoryNoteID,
      garmentAccessoryID: req.body.garmentAccessoryID
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
      const item1 = await service.getByAccessoryNoteID(parseInt(id))
      if (item1) {
        return res.formatter.ok({ data: item1 })
      }

      const item2 = await service.getByGarmentAccessoryID(parseInt(id))
      if (item2) {
        return res.formatter.ok({ data: item2 })
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
    const itemRequest: NotionAccessory = {
      accessoryNoteID: req.body.accessoryNoteID,
      garmentAccessoryID: req.body.garmentAccessoryID,
      orderNumber: req.body.orderNumber
    }
    try {
      const itemUpdated1 = await service.updateByAccessoryNoteID(itemRequest)
      if (itemUpdated1) {
        return res.formatter.ok({ data: itemUpdated1 })
      }

      const itemUpdated2 = await service.updateByGarmentAccessoryID(itemRequest)
      if (itemUpdated2) {
        return res.formatter.ok({ data: itemUpdated2 })
      }
      return res.formatter.badRequest({})
    } catch (error) {
      return res.formatter.badRequest({ message: `${error}` })
    }
  }

  deleteItemByID = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
      const item1 = await service.deleteByAccessoryNoteID(parseInt(id))
      if (item1) {
        return res.formatter.ok({ message: `${NAMESPACE} has been deleted` })
      }

      const item2 = await service.deleteByGarmentAccessoryID(parseInt(id))
      if (item2) {
        return res.formatter.ok({ message: `${NAMESPACE} has been deleted` })
      }
      return res.formatter.notFound({})
    } catch (error) {
      return res.formatter.badRequest({ message: `${error}` })
    }
  }
}
