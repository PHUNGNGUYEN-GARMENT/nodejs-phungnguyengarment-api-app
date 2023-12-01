import { Request, Response } from 'express'
import { Product } from '~/models/product.model'
import * as service from '~/services/product.service'

const NAMESPACE = 'Product'
const PATH = 'controllers/product'

export default class ProductController {
  constructor() {}

  createNewItem = async (req: Request, res: Response) => {
    const userRequest: Product = {
      productCode: req.body.productCode,
      quantityPO: req.body.quantityPO,
      dateInputNPL: req.body.dateInputNPL,
      dateOutputFCR: req.body.dateOutputFCR
    }
    try {
      const itemNew = await service.createNew(userRequest)

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
    const { id, code } = req.query
    try {
      const item2 = await service.getByCode(String(code))
      if (item2) {
        return res.formatter.ok({ data: item2 })
      }
      const item1 = await service.getByID(Number(id))
      if (item1) {
        return res.formatter.ok({ data: item1 })
      }

      return res.formatter.notFound({})
    } catch (error) {
      return res.formatter.badRequest({ message: `${error}` })
    }
  }

  getAllItems = async (req: Request, res: Response) => {
    const { current = 1, pageSize = 10 } = req.query
    const offset = (Number(current) - 1) * Number(pageSize)
    try {
      const items = await service.getAll(Number(pageSize), Number(offset))
      const total = await service.getTotalCount()
      const convertItem = items.rows.map((item) => {
        return {
          ...item.dataValues,
          sewing: 'normal',
          iron: 'warn',
          check: 'error',
          pack: 'success'
        }
      })
      return res.formatter.ok({
        data: convertItem,
        count: convertItem.length,
        page: Number(current),
        total: total
      })
    } catch (error) {
      return res.formatter.badRequest({ message: `${error}` })
    }
  }

  updateItemByID = async (req: Request, res: Response) => {
    const itemRequest: Product = {
      id: Number(req.params.id),
      productCode: req.body.productCode,
      quantityPO: req.body.quantityPO,
      dateInputNPL: req.body.dateInputNPL,
      dateOutputFCR: req.body.dateOutputFCR
    }
    try {
      console.log(itemRequest)
      const itemUpdated = await service.updateByID(itemRequest)
      if (itemUpdated) {
        return res.formatter.ok({ data: itemUpdated })
      } else {
        return res.formatter.badRequest({})
      }
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
      } else {
        return res.formatter.badRequest({})
      }
    } catch (error) {
      return res.formatter.badRequest({ message: `${error}` })
    }
  }
}
