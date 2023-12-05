import { Request, Response } from 'express'
import { Print } from '~/models/print.model'
import * as service from '~/services/print.service'
import { RequestBodyType } from '~/type'

const NAMESPACE = 'Print'
const PATH = 'controllers/print'

export default class PrintController {
  constructor() {}

  createNewItem = async (req: Request, res: Response) => {
    const itemRequest: Print = {
      name: req.body.name,
      status: req.body.status
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

  getItemByName = async (req: Request, res: Response) => {
    const name = String(req.query.name)
    try {
      const item = await service.getItemBy({ name: name })
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
        length: items.rows.length,
        page: Number(bodyRequest.paginator.page),
        total: bodyRequest.search.term.length > 0 ? items.count : total.length
      })
    } catch (error) {
      return res.formatter.badRequest({ message: `${error}` })
    }
  }

  updateItemByID = async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const itemRequest: Print = {
      name: req.body.name,
      status: req.body.status,
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
