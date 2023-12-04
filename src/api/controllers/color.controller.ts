import { Request, Response } from 'express'
import { Color } from '~/models/color.model'
import * as service from '~/services/color.service'
import { RequestBodyType } from '~/type'

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
    const id = Number(req.query.id)
    try {
      const item = await service.getItemBy({ id: id })
      if (item) {
        return res.formatter.ok({ data: item })
      }
      return res.formatter.notFound({})
    } catch (error) {
      return res.formatter.badRequest({ message: `${error}` })
    }
  }

  getItemByHexCode = async (req: Request, res: Response) => {
    const hex = String(req.query.hex)
    try {
      const item = await service.getItemBy({ hexColor: hex })
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
      console.log({
        items,
        total
      })
      return res.formatter.ok({
        data: items.rows,
        length: items.rows.length,
        page: Number(bodyRequest.paginator.page),
        total: total.length
      })
    } catch (error) {
      return res.formatter.badRequest({ message: `${error}` })
    }
  }

  updateItemByID = async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const itemRequest: Color = {
      nameColor: req.body.nameColor,
      hexColor: req.body.hexColor,
      status: req.body.status,
      createdAt: req.body.createdAt,
      updatedAt: req.body.updatedAt,
      orderNumber: req.body.orderNumber
    }
    try {
      const itemUpdated = await service.updateByID(id, itemRequest)
      if (itemUpdated) {
        return res.formatter.ok({ data: itemUpdated })
      }
      return res.formatter.badRequest({})
    } catch (error) {
      return res.formatter.badRequest({ message: `${error}` })
    }
  }

  deleteItemByID = async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    try {
      const item = await service.deleteByID(id)
      if (item) {
        return res.formatter.ok({ message: `${NAMESPACE} has been deleted` })
      }
      return res.formatter.notFound({})
    } catch (error) {
      return res.formatter.badRequest({ message: `${error}` })
    }
  }
}
