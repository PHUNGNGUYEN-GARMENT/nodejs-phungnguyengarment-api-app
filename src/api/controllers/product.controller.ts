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
          sewing: 1500,
          iron: 1000,
          check: 500,
          pack: 200
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

  // getAllItems = async (req: Request, res: Response) => {
  //   const { current = 1, pageSize = 10 } = req.query
  //   const offset = (Number(current) - 1) * Number(pageSize)
  //   try {
  //     const items = await service.getAll(Number(pageSize), Number(offset))
  //     const total = await service.getTotalCount()
  //     const convertItem = items.rows.map((item) => {
  //       return {
  //         ...item.dataValues,
  //         sewing: 1500,
  //         iron: 1000,
  //         check: 500,
  //         pack: 200
  //       }
  //     })
  //     return res.formatter.ok({
  //       data: convertItem,
  //       count: convertItem.length,
  //       page: Number(current),
  //       total: total
  //     })
  //   } catch (error) {
  //     return res.formatter.badRequest({ message: `${error}` })
  //   }
  // }

  updateItemByID = async (req: Request, res: Response) => {
    const itemRequest: Product = {
      productCode: req.body.productCode,
      quantityPO: req.body.quantityPO,
      dateInputNPL: req.body.dateInputNPL,
      dateOutputFCR: req.body.dateOutputFCR
    }
    try {
      console.log(itemRequest)
      const itemUpdated = await service.updateItemByID(Number(req.params.id), itemRequest)
      if (itemUpdated) {
        return res.formatter.ok({ data: itemUpdated })
      }
      return res.formatter.badRequest({})
    } catch (error) {
      return res.formatter.badRequest({ message: `${error}` })
    }
  }

  deleteItemByID = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
      const item = await service.deleteItemByID(parseInt(id))
      if (item) {
        return res.formatter.ok({ message: `${NAMESPACE} has been deleted` })
      }
      return res.formatter.badRequest({})
    } catch (error) {
      return res.formatter.badRequest({ message: `${error}` })
    }
  }
}
