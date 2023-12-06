import { Request, Response } from 'express'
import { Importation } from '~/models/importation.model'
import * as service from '~/services/importation.service'
import { RequestBodyType } from '~/type'

const NAMESPACE = 'Importation'
const PATH = 'controllers/importation'

export default class ImportationController {
  constructor() {}

  createNewItem = async (req: Request, res: Response) => {
    const itemRequest: Importation = {
      dateImported: req.body.dateImported,
      status: req.body.status,
      quantity: req.body.quantity,
      productID: req.body.productID
    }
    try {
      const itemNew = await service.createNew(itemRequest)

      if (itemNew) {
        return res.formatter.created({ data: itemNew })
      }
      return res.formatter.badRequest({ message: `${NAMESPACE} already exists` })
    } catch (error) {
      return res.formatter.badRequest({ message: `>>> ${error}` })
    }
  }

  getItemByPk = async (req: Request, res: Response) => {
    const id = Number(req.query.id)
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

  getItemByProductID = async (req: Request, res: Response) => {
    const productID = Number(req.params.productID)
    try {
      const item = await service.getItemByProductID(productID)
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
    const itemRequest: Importation = {
      dateImported: req.body.dateImported,
      status: req.body.status,
      quantity: req.body.quantity,
      orderNumber: req.body.orderNumber
    }
    console.log('>>>', itemRequest)
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

  updateItemByProductID = async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const itemRequest: Importation = {
      dateImported: req.body.dateImported,
      status: req.body.status,
      quantity: req.body.quantity,
      orderNumber: req.body.orderNumber
    }
    console.log('>>>', itemRequest)
    try {
      const itemUpdated = await service.updateByProductID(id, itemRequest)
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
