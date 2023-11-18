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
      dateOutPutFCR: req.body.dateOutPutFCR,
      placePrintIn: req.body.placePrintIn
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
    const { id } = req.params
    try {
      const item = await service.getByID(parseInt(id))
      if (item) {
        return res.formatter.ok({ data: item })
      } else {
        return res.formatter.notFound({})
      }
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
    const itemRequest: Product = {
      productID: req.body.productID,
      productCode: req.body.productCode,
      quantityPO: req.body.quantityPO,
      dateInputNPL: req.body.dateInputNPL,
      dateOutPutFCR: req.body.dateOutPutFCR,
      placePrintIn: req.body.placePrintIn
    }
    try {
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
