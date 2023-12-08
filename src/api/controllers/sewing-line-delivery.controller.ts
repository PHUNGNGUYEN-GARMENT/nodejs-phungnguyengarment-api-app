import { Request, Response } from 'express'
import { SewingLineDelivery } from '~/models/sewing-line-delivery.model'
import * as service from '~/services/sewing-line-delivery.service'
import { RequestBodyType } from '~/type'

const NAMESPACE = 'controllers/sewing-line-delivery'

export default class SewingLineDeliveryController {
  constructor() {}

  createNewItem = async (req: Request, res: Response) => {
    const itemRequest: SewingLineDelivery = {
      productID: req.body.productID,
      sewingLineID: req.body.sewingLineID,
      quantityOrigin: req.body.quantityOrigin,
      quantitySewed: req.body.quantitySewed,
      status: req.body.status
    }
    try {
      const itemNew = await service.createNewItem(itemRequest)

      if (itemNew) {
        return res.formatter.created({ data: itemNew })
      }
      return res.formatter.badRequest({ message: `${NAMESPACE} already exists` })
    } catch (error) {
      return res.formatter.badRequest({ message: `>>> ${error}` })
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

  getItemByProductID = async (req: Request, res: Response) => {
    const productID = Number(req.params.productID)
    try {
      const item = await service.getItemBy({ productID: productID })
      if (item) {
        return res.formatter.ok({ data: item })
      }
      return res.formatter.notFound({})
    } catch (error) {
      return res.formatter.badRequest({ message: `${error}` })
    }
  }

  getItemBySewingLineID = async (req: Request, res: Response) => {
    const sewingLineID = Number(req.params.sewingLineID)
    try {
      const item = await service.getItemBy({ sewingLineID: sewingLineID })
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

  updateItemByPk = async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const itemRequest: SewingLineDelivery = {
      productID: req.body.productID,
      sewingLineID: req.body.sewingLineID,
      quantityOrigin: req.body.quantityOrigin,
      quantitySewed: req.body.quantitySewed,
      status: req.body.status
    }
    try {
      const printUpdated = await service.updateItemByPk(id, itemRequest)
      if (printUpdated) {
        return res.formatter.ok({ data: printUpdated })
      }
      return res.formatter.badRequest({})
    } catch (error) {
      return res.formatter.badRequest({ message: `${error}` })
    }
  }

  updateItemByProductID = async (req: Request, res: Response) => {
    const productID = Number(req.params.productID)
    const itemRequest: SewingLineDelivery = {
      sewingLineID: req.body.sewingLineID,
      quantityOrigin: req.body.quantityOrigin,
      quantitySewed: req.body.quantitySewed,
      status: req.body.status
    }
    try {
      const printUpdated = await service.updateItemByProductID(productID, itemRequest)
      if (printUpdated) {
        return res.formatter.ok({ data: printUpdated })
      }
      return res.formatter.badRequest({})
    } catch (error) {
      return res.formatter.badRequest({ message: `${error}` })
    }
  }

  updateItemBySewingLineID = async (req: Request, res: Response) => {
    const sewingLineID = Number(req.params.sewingLineID)
    const itemRequest: SewingLineDelivery = {
      productID: req.body.productID,
      quantityOrigin: req.body.quantityOrigin,
      quantitySewed: req.body.quantitySewed,
      status: req.body.status
    }
    try {
      const printUpdated = await service.updateItemBySewingLineID(sewingLineID, itemRequest)
      if (printUpdated) {
        return res.formatter.ok({ data: printUpdated })
      }
      return res.formatter.badRequest({})
    } catch (error) {
      return res.formatter.badRequest({ message: `${error}` })
    }
  }

  deleteItemByPk = async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    try {
      const item = await service.deleteItemByPk(id)
      if (item) {
        return res.formatter.ok({ message: `${NAMESPACE} has been deleted` })
      }
      return res.formatter.notFound({})
    } catch (error) {
      return res.formatter.badRequest({ message: `${error}` })
    }
  }

  deleteItemBySewingLineID = async (req: Request, res: Response) => {
    const sewingLineID = Number(req.params.sewingLineID)
    try {
      const item = await service.deleteItemBySewingLineID(sewingLineID)
      if (item) {
        return res.formatter.ok({ message: `${NAMESPACE} has been deleted` })
      }
      return res.formatter.notFound({})
    } catch (error) {
      return res.formatter.badRequest({ message: `${error}` })
    }
  }

  deleteItemByProductID = async (req: Request, res: Response) => {
    const productID = Number(req.params.productID)
    try {
      const item = await service.deleteItemByProductID(productID)
      if (item) {
        return res.formatter.ok({ message: `${NAMESPACE} has been deleted` })
      }
      return res.formatter.notFound({})
    } catch (error) {
      return res.formatter.badRequest({ message: `${error}` })
    }
  }
}
