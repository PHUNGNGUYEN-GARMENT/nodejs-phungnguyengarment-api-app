import { Request, Response } from 'express'
import { GarmentAccessoryNote } from '~/models/garment-accessory-note.model'
import * as service from '~/services/garment-accessory-note.service'
import { RequestBodyType } from '~/type'

const NAMESPACE = 'controllers/garment-accessory-note'

export default class GarmentAccessoryNoteController {
  constructor() {}

  createNewItem = async (req: Request, res: Response) => {
    const itemRequest: GarmentAccessoryNote = {
      title: req.body.title,
      summary: req.body.summary,
      accessoryNoteID: req.body.accessoryNoteID,
      garmentAccessoryID: req.body.garmentAccessoryID,
      cuttingAccessoryDate: req.body.cuttingAccessoryDate,
      amountCuttingAccessory: req.body.amountCuttingAccessory,
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

  getItemByAccessoryNoteID = async (req: Request, res: Response) => {
    const accessoryNoteID = Number(req.params.accessoryNoteID)
    try {
      const item = await service.getItemBy({ accessoryNoteID: accessoryNoteID })
      if (item) {
        return res.formatter.ok({ data: item })
      }
      return res.formatter.notFound({})
    } catch (error) {
      return res.formatter.badRequest({ message: `${error}` })
    }
  }

  getItemByGarmentAccessoryID = async (req: Request, res: Response) => {
    const garmentAccessoryID = Number(req.params.garmentAccessoryID)
    try {
      const item = await service.getItemBy({ garmentAccessoryID: garmentAccessoryID })
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
    const itemRequest: GarmentAccessoryNote = {
      title: req.body.title,
      summary: req.body.summary,
      accessoryNoteID: req.body.accessoryNoteID,
      garmentAccessoryID: req.body.garmentAccessoryID,
      cuttingAccessoryDate: req.body.cuttingAccessoryDate,
      amountCuttingAccessory: req.body.amountCuttingAccessory,
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

  updateItemByAccessoryNoteID = async (req: Request, res: Response) => {
    const accessoryNoteID = Number(req.params.accessoryNoteID)
    const itemRequest: GarmentAccessoryNote = {
      title: req.body.title,
      summary: req.body.summary,
      garmentAccessoryID: req.body.garmentAccessoryID,
      cuttingAccessoryDate: req.body.cuttingAccessoryDate,
      amountCuttingAccessory: req.body.amountCuttingAccessory,
      status: req.body.status
    }
    try {
      const itemUpdated = await service.updateItemByAccessoryNoteID(accessoryNoteID, itemRequest)
      if (itemUpdated) {
        return res.formatter.ok({ data: itemUpdated })
      }
      return res.formatter.badRequest({})
    } catch (error) {
      return res.formatter.badRequest({ message: `${error}` })
    }
  }

  updateItemByGarmentAccessoryID = async (req: Request, res: Response) => {
    const garmentAccessoryID = Number(req.params.garmentAccessoryID)
    const itemRequest: GarmentAccessoryNote = {
      title: req.body.title,
      summary: req.body.summary,
      accessoryNoteID: req.body.accessoryNoteID,
      cuttingAccessoryDate: req.body.cuttingAccessoryDate,
      amountCuttingAccessory: req.body.amountCuttingAccessory,
      status: req.body.status
    }
    try {
      const itemUpdated = await service.updateItemByGarmentAccessoryID(garmentAccessoryID, itemRequest)
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

  deleteItemByAccessoryNoteID = async (req: Request, res: Response) => {
    const accessoryNoteID = Number(req.params.accessoryNoteID)
    try {
      const itemUpdated = await service.deleteItemByAccessoryNoteID(accessoryNoteID)
      if (itemUpdated) {
        return res.formatter.ok({ data: itemUpdated })
      }
      return res.formatter.badRequest({})
    } catch (error) {
      return res.formatter.badRequest({ message: `${error}` })
    }
  }

  deleteItemByGarmentAccessoryID = async (req: Request, res: Response) => {
    const garmentAccessoryID = Number(req.params.garmentAccessoryID)
    try {
      const itemUpdated = await service.deleteItemByGarmentAccessoryID(garmentAccessoryID)
      if (itemUpdated) {
        return res.formatter.ok({ data: itemUpdated })
      }
      return res.formatter.badRequest({})
    } catch (error) {
      return res.formatter.badRequest({ message: `${error}` })
    }
  }
}
