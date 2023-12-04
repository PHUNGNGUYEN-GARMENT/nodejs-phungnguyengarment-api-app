import { Request, Response } from 'express'
import { Product } from '~/models/product.model'
import * as service from '~/services/product.service'
import { RequestBodyType } from '~/type'

const NAMESPACE = 'Product'
const PATH = 'controllers/product'

export default class ProductController {
  constructor() {}

  createNewItem = async (req: Request, res: Response) => {
    const dataRequest: Product = {
      productCode: req.body.productCode,
      quantityPO: req.body.quantityPO,
      status: req.body.status,
      dateInputNPL: req.body.dateInputNPL,
      dateOutputFCR: req.body.dateOutputFCR
    }
    try {
      const itemNew = await service.createNewItem(dataRequest)

      if (itemNew) {
        return res.formatter.created({ data: itemNew })
      }
      return res.formatter.badRequest({ message: `${NAMESPACE} already exists` })
    } catch (error) {
      return res.formatter.badRequest({ message: `${error}` })
    }
  }

  getItemByID = async (req: Request, res: Response) => {
    try {
      const id = Number(req.query.id)
      const item = await service.getItemBy({ id: id })

      if (item) {
        return res.formatter.ok({
          data: {
            ...item.dataValues,
            progress: {
              sewing: 1500,
              iron: 1000,
              check: 500,
              pack: 200
            }
          }
        })
      }
      return res.formatter.notFound({})
    } catch (error) {
      return res.formatter.badRequest({ message: `${error}` })
    }
  }

  getItemByCode = async (req: Request, res: Response) => {
    try {
      const code = String(req.query.code)
      const item = await service.getItemBy({ productCode: code })

      if (item) {
        return res.formatter.ok({
          data: {
            ...item.dataValues,
            progress: {
              sewing: 1500,
              iron: 1000,
              check: 500,
              pack: 200
            }
          }
        })
      }
      return res.formatter.notFound({})
    } catch (error) {
      return res.formatter.badRequest({ message: `${error}` })
    }
  }

  getItems = async (req: Request, res: Response) => {
    try {
      const { code } = req.params
      const bodyRequest: RequestBodyType = {
        ...req.body
      }
      const items = await service.getItems(String(code), bodyRequest)
      const total = await service.getItemsCount()
      const convertData = items.rows.map((item) => {
        return {
          ...item.dataValues,
          progress: {
            sewing: 1500,
            iron: 1000,
            check: 500,
            pack: 200
          }
        }
      })
      return res.formatter.ok({
        data: convertData,
        count: convertData.length,
        page: Number(bodyRequest.paginator.page),
        total: total
      })
    } catch (error) {
      return res.formatter.badRequest({ message: `${error}` })
    }
  }

  updateItemByID = async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const itemRequest: Product = {
      productCode: req.body.productCode,
      quantityPO: req.body.quantityPO,
      status: req.body.status,
      dateInputNPL: req.body.dateInputNPL,
      dateOutputFCR: req.body.dateOutputFCR
    }
    try {
      const itemUpdated = await service.updateItemByID(id, itemRequest)
      if (itemUpdated) {
        return res.formatter.ok({ data: itemUpdated })
      }
      return res.formatter.notFound({})
    } catch (error) {
      return res.formatter.badRequest({ message: `${error}` })
    }
  }

  deleteItemByID = async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    try {
      const item = await service.deleteItemByID(id)
      if (item) {
        return res.formatter.ok({ message: `${NAMESPACE} has been deleted` })
      }
      return res.formatter.notFound({})
    } catch (error) {
      return res.formatter.badRequest({ message: `${error}` })
    }
  }
}
