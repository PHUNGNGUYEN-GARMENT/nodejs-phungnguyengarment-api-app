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
        return res.formatter.created({ status: 201, data: itemNew })
      } else {
        return res.formatter.badRequest({ status: 404, message: `${NAMESPACE} already exists` })
      }
    } catch (error) {
      return res.formatter.badRequest({ status: 400, message: `${error}` })
    }
  }

  getItemByID = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
      const item = await service.getByID(parseInt(id))
      console.log('>>>', item)
      if (item) {
        return res.formatter.ok({ status: 200, data: item })
      } else {
        return res.formatter.badRequest({ status: 400 })
      }
    } catch (error) {
      return res.formatter.badRequest({ status: 400, message: `${error}` })
    }
  }

  getAllItems = async (req: Request, res: Response) => {
    try {
      const items = await service.getAll()
      return res.formatter.ok({ status: 200, data: items })
    } catch (error) {
      return res.formatter.badRequest({ status: 400, message: `${error}` })
    }
  }

  updateItemByID = async (req: Request, res: Response) => {
    const { id } = req.params
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
        return res.formatter.ok({ status: 200, data: itemUpdated })
      } else {
        return res.formatter.badRequest({ status: 400 })
      }
    } catch (error) {
      return res.formatter.badRequest({ status: 400, message: `${error}` })
    }
  }

  deleteItemByID = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
      const item = await service.deleteByID(parseInt(id))
      if (item) {
        return res.formatter.ok({ status: 200, message: `${NAMESPACE} has been deleted` })
      } else {
        return res.formatter.badRequest({ status: 400 })
      }
    } catch (error) {
      return res.formatter.badRequest({ status: 400, message: `${error}` })
    }
  }
}
