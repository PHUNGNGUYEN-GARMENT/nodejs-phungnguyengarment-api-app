import { Request, Response } from 'express'
import { GarmentAccessoryNote } from '~/models/garment-accessory-note.model'
import * as service from '~/services/garment-accessory-note.service'
import { RequestBodyType } from '~/type'
import { message } from '../utils/constant'

const NAMESPACE = 'controllers/garment-accessory-note'

export default class GarmentAccessoryNoteController {
  constructor() {}

  createNewItem = async (req: Request, res: Response) => {
    try {
      const itemRequest: GarmentAccessoryNote = {
        accessoryNoteID: req.body.accessoryNoteID,
        garmentAccessoryID: req.body.garmentAccessoryID,
        status: req.body.status ?? 'active'
      }
      const itemNew = await service.createNewItem(itemRequest)

      if (itemNew) {
        return res.formatter.created({ data: itemNew, message: message.CREATED })
      }
      return res.formatter.badRequest({ message: message.CREATION_FAILED })
    } catch (error) {
      return res.formatter.badRequest({ message: message.ERROR })
    }
  }

  getItemByPk = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id)
      const item = await service.getItemByPk(id)
      if (item) {
        return res.formatter.ok({ data: item, message: message.SUCCESS })
      }
      return res.formatter.notFound({ message: message.NOT_FOUND })
    } catch (error) {
      return res.formatter.badRequest({ message: message.ERROR })
    }
  }

  getItemByAccessoryNoteID = async (req: Request, res: Response) => {
    try {
      const accessoryNoteID = Number(req.params.accessoryNoteID)
      const item = await service.getItemBy({ field: 'accessoryNoteID', id: accessoryNoteID })
      if (item) {
        return res.formatter.ok({ data: item, message: message.SUCCESS })
      }
      return res.formatter.notFound({ message: message.NOT_FOUND })
    } catch (error) {
      return res.formatter.badRequest({ message: message.ERROR })
    }
  }

  getItemByGarmentAccessoryID = async (req: Request, res: Response) => {
    const garmentAccessoryID = Number(req.params.garmentAccessoryID)
    try {
      const item = await service.getItemBy({ field: 'garmentAccessoryID', id: garmentAccessoryID })
      if (item) {
        return res.formatter.ok({ data: item, message: message.SUCCESS })
      }
      return res.formatter.notFound({ message: message.NOT_FOUND })
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
        total: bodyRequest.search.term.length > 0 ? items.count : total.length,
        message: message.SUCCESS
      })
    } catch (error) {
      return res.formatter.badRequest({ message: message.ERROR })
    }
  }

  updateItemByPk = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id)
      const itemRequest: GarmentAccessoryNote = {
        accessoryNoteID: req.body.accessoryNoteID,
        garmentAccessoryID: req.body.garmentAccessoryID,
        status: req.body.status ?? 'active'
      }
      const itemUpdated = await service.updateItemByPk(id, itemRequest)
      if (itemUpdated) {
        return res.formatter.ok({ data: itemUpdated, message: message.UPDATED })
      }
      return res.formatter.badRequest({ message: message.UPDATE_FAILED })
    } catch (error) {
      return res.formatter.badRequest({ message: message.ERROR })
    }
  }

  updateItemByAccessoryNoteID = async (req: Request, res: Response) => {
    try {
      const accessoryNoteID = Number(req.params.accessoryNoteID)
      const itemRequest: GarmentAccessoryNote = {
        garmentAccessoryID: req.body.garmentAccessoryID,
        status: req.body.status ?? 'active'
      }
      const itemUpdated = await service.updateItemBy({ field: 'accessoryNoteID', id: accessoryNoteID }, itemRequest)
      if (itemUpdated) {
        return res.formatter.ok({ data: itemUpdated, message: message.UPDATED })
      }
      return res.formatter.badRequest({ message: message.UPDATE_FAILED })
    } catch (error) {
      return res.formatter.badRequest({ message: message.ERROR })
    }
  }

  updateItemByGarmentAccessoryID = async (req: Request, res: Response) => {
    try {
      const garmentAccessoryID = Number(req.params.garmentAccessoryID)
      const itemRequest: GarmentAccessoryNote = {
        accessoryNoteID: req.body.accessoryNoteID,
        status: req.body.status ?? 'active'
      }
      const itemUpdated = await service.updateItemBy(
        { field: 'garmentAccessoryID', id: garmentAccessoryID },
        itemRequest
      )
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

  deleteItemByAccessoryNoteID = async (req: Request, res: Response) => {
    const accessoryNoteID = Number(req.params.accessoryNoteID)
    try {
      const itemDeleted = await service.deleteItemBy({ field: 'accessoryNoteID', id: accessoryNoteID })
      if (itemDeleted) {
        return res.formatter.ok({ data: itemDeleted, message: message.DELETED })
      }
      return res.formatter.badRequest({ message: message.DELETE_FAILED })
    } catch (error) {
      return res.formatter.badRequest({ message: message.ERROR })
    }
  }

  deleteItemByGarmentAccessoryID = async (req: Request, res: Response) => {
    const garmentAccessoryID = Number(req.params.garmentAccessoryID)
    try {
      const itemDeleted = await service.deleteItemBy({ field: 'garmentAccessoryID', id: garmentAccessoryID })
      if (itemDeleted) {
        return res.formatter.ok({ data: itemDeleted, message: message.DELETED })
      }
      return res.formatter.badRequest({ message: message.DELETE_FAILED })
    } catch (error) {
      return res.formatter.badRequest({ message: message.ERROR })
    }
  }
}