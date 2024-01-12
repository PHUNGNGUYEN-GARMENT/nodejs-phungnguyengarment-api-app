import { Request, Response } from 'express'
import { SewingLineDelivery } from '~/models/sewing-line-delivery.model'
import * as service from '~/services/sewing-line-delivery.service'
import { RequestBodyType } from '~/type'
import { message } from '../utils/constant'

const NAMESPACE = 'controllers/sewing-line-delivery'

export default class SewingLineDeliveryController {
  constructor() {}

  createNewItem = async (req: Request, res: Response) => {
    const itemRequest: SewingLineDelivery = {
      productID: req.body.productID,
      sewingLineID: req.body.sewingLineID,
      quantityOriginal: req.body.quantityOriginal,
      quantitySewed: req.body.quantitySewed,
      expiredDate: req.body.expiredDate,
      status: req.body.status ?? 'active'
    }
    try {
      const itemNew = await service.createNewItem(itemRequest)

      if (itemNew) {
        return res.formatter.created({ data: itemNew, message: message.CREATED })
      }
      return res.formatter.badRequest({ message: message.CREATION_FAILED })
    } catch (error) {
      return res.formatter.badRequest({ message: message.ERROR })
    }
  }

  createNewItems = async (req: Request, res: Response) => {
    try {
      const itemRequest: SewingLineDelivery[] = req.body
      const itemNew = await service.createNewItems(
        itemRequest.map((item) => {
          return { ...item, status: 'active' }
        })
      )
      if (itemNew) {
        return res.formatter.created({ data: itemNew, message: message.CREATED })
      }
      return res.formatter.badRequest({ message: message.CREATION_FAILED })
    } catch (error) {
      return res.formatter.badRequest({ message: message.ERROR })
    }
  }

  getItemByPk = async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    try {
      const item = await service.getItemByPk(id)
      if (item) {
        return res.formatter.ok({ data: item, message: message.SUCCESS })
      }
      return res.formatter.notFound({ message: message.FAILED })
    } catch (error) {
      return res.formatter.badRequest({ message: message.ERROR })
    }
  }

  getItemByProductID = async (req: Request, res: Response) => {
    const productID = Number(req.params.productID)
    try {
      const item = await service.getItemBy({ productID: productID })
      if (item) {
        return res.formatter.ok({ data: item, message: message.SUCCESS })
      }
      return res.formatter.notFound({ message: message.FAILED })
    } catch (error) {
      return res.formatter.badRequest({ message: message.ERROR })
    }
  }

  getItemBySewingLineID = async (req: Request, res: Response) => {
    const sewingLineID = Number(req.params.sewingLineID)
    try {
      const item = await service.getItemBy({ sewingLineID: sewingLineID })
      if (item) {
        return res.formatter.ok({ data: item, message: message.SUCCESS })
      }
      return res.formatter.notFound({ message: message.FAILED })
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
        length: items.rows.length,
        page: Number(bodyRequest.paginator.page),
        total: bodyRequest.search.term.length > 0 ? items.count : total.length,
        message: message.SUCCESS
      })
    } catch (error) {
      return res.formatter.badRequest({ message: message.ERROR })
    }
  }

  updateItemsByID = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id)
      const itemRequest: SewingLineDelivery[] = req.body
      const itemUpdated = await service.updateItemsBy({ field: 'id', id: id }, itemRequest)
      if (itemUpdated) {
        return res.formatter.ok({ data: itemUpdated, message: message.UPDATED })
      }
      return res.formatter.badRequest({ message: message.UPDATE_FAILED })
    } catch (error) {
      return res.formatter.badRequest({ message: message.ERROR })
    }
  }

  updateItemsBySewingLineID = async (req: Request, res: Response) => {
    try {
      const sewingLineID = Number(req.params.sewingLineID)
      const itemRequest: SewingLineDelivery[] = req.body
      const itemUpdated = await service.updateItemsBy(
        { field: 'sewingLineID', id: sewingLineID },
        itemRequest.map((item) => {
          return { ...item, sewingLineID }
        })
      )
      if (itemUpdated) {
        return res.formatter.ok({ data: itemUpdated, message: message.UPDATED })
      }
      return res.formatter.badRequest({ message: message.UPDATE_FAILED })
    } catch (error) {
      return res.formatter.badRequest({ message: message.ERROR })
    }
  }

  updateItemsByProductID = async (req: Request, res: Response) => {
    try {
      const productID = Number(req.params.productID)
      const itemRequest: SewingLineDelivery[] = req.body
      const itemUpdated = await service.updateItemsBy(
        { field: 'productID', id: productID },
        itemRequest.map((item) => {
          return { ...item, productID }
        })
      )
      if (itemUpdated) {
        return res.formatter.ok({ data: itemUpdated, message: message.UPDATED })
      }
      return res.formatter.badRequest({ message: message.UPDATE_FAILED })
    } catch (error) {
      return res.formatter.badRequest({ message: message.ERROR })
    }
  }

  updateItemByPk = async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const itemRequest: SewingLineDelivery = {
      productID: req.body.productID,
      sewingLineID: req.body.sewingLineID,
      quantityOriginal: req.body.quantityOriginal,
      quantitySewed: req.body.quantitySewed,
      expiredDate: req.body.expiredDate,
      status: req.body.status
    }
    try {
      const printUpdated = await service.updateItemByPk(id, itemRequest)
      if (printUpdated) {
        return res.formatter.ok({ data: printUpdated, message: message.SUCCESS })
      }
      return res.formatter.badRequest({ message: message.FAILED })
    } catch (error) {
      return res.formatter.badRequest({ message: message.ERROR })
    }
  }

  updateItemByProductID = async (req: Request, res: Response) => {
    const productID = Number(req.params.productID)
    const itemRequest: SewingLineDelivery = {
      sewingLineID: req.body.sewingLineID,
      quantityOriginal: req.body.quantityOriginal,
      quantitySewed: req.body.quantitySewed,
      expiredDate: req.body.expiredDate,
      status: req.body.status
    }
    try {
      const printUpdated = await service.updateItemByProductID(productID, itemRequest)
      if (printUpdated) {
        return res.formatter.ok({ data: printUpdated, message: message.UPDATED })
      }
      return res.formatter.badRequest({ message: message.UPDATE_FAILED })
    } catch (error) {
      return res.formatter.badRequest({ message: message.ERROR })
    }
  }

  updateItemBySewingLineID = async (req: Request, res: Response) => {
    const sewingLineID = Number(req.params.sewingLineID)
    const itemRequest: SewingLineDelivery = {
      productID: req.body.productID,
      quantityOriginal: req.body.quantityOriginal,
      quantitySewed: req.body.quantitySewed,
      expiredDate: req.body.expiredDate,
      status: req.body.status
    }
    try {
      const printUpdated = await service.updateItemBySewingLineID(sewingLineID, itemRequest)
      if (printUpdated) {
        return res.formatter.ok({ data: printUpdated, message: message.UPDATED })
      }
      return res.formatter.badRequest({ message: message.UPDATE_FAILED })
    } catch (error) {
      return res.formatter.badRequest({ message: message.ERROR })
    }
  }

  deleteItemByPk = async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    try {
      const item = await service.deleteItemByPk(id)
      if (item) {
        return res.formatter.ok({ message: message.DELETED })
      }
      return res.formatter.notFound({ message: message.DELETE_FAILED })
    } catch (error) {
      return res.formatter.badRequest({ message: message.ERROR })
    }
  }

  deleteItemBySewingLineID = async (req: Request, res: Response) => {
    const sewingLineID = Number(req.params.sewingLineID)
    try {
      const item = await service.deleteItemBySewingLineID(sewingLineID)
      if (item) {
        return res.formatter.ok({ message: message.DELETED })
      }
      return res.formatter.notFound({ message: message.DELETE_FAILED })
    } catch (error) {
      return res.formatter.badRequest({ message: message.ERROR })
    }
  }

  deleteItemByProductID = async (req: Request, res: Response) => {
    const productID = Number(req.params.productID)
    try {
      const item = await service.deleteItemByProductID(productID)
      if (item) {
        return res.formatter.ok({ message: message.DELETED })
      }
      return res.formatter.notFound({ message: message.DELETE_FAILED })
    } catch (error) {
      return res.formatter.badRequest({ message: message.ERROR })
    }
  }
}
