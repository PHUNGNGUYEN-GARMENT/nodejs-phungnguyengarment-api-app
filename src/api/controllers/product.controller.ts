import { Request, Response } from 'express'
import { Product } from '~/models/product.model'
import * as productColorService from '~/services/product-color.service'
import * as service from '~/services/product.service'
import { ItemStatusType, RequestBodyType } from '~/type'

const NAMESPACE = 'Product'
const PATH = 'controllers/product'

export default class ProductController {
  constructor() {}

  createNewItem = async (req: Request, res: Response) => {
    const dataRequest: Product = {
      productCode: String(req.body.productCode),
      quantityPO: Number(req.body.quantityPO),
      status: req.body.status as ItemStatusType,
      dateInputNPL: new Date(req.body.dateInputNPL),
      dateOutputFCR: new Date(req.body.dateOutputFCR)
    }
    try {
      const newProd = await service.createNewItem(dataRequest)
      if (newProd) {
        return res.formatter.created({ data: newProd })
      }
      return res.formatter.badRequest({ message: `Failed to create new item` })
    } catch (error) {
      return res.formatter.badRequest({ message: `Failed to create new item with: ${error}` })
    }
  }

  getItemByPk = async (req: Request, res: Response) => {
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

  getItemByProductCode = async (req: Request, res: Response) => {
    try {
      const productCode = String(req.params.productCode)
      const item = await service.getItemBy({ productCode: productCode })

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
      return res.formatter.badRequest({ message: `${PATH}/${error}` })
    }
  }

  getItems = async (req: Request, res: Response) => {
    try {
      const bodyRequest: RequestBodyType = {
        ...req.body
      }
      const items = await service.getItems(bodyRequest)
      const total = await service.getItemsWithStatus(bodyRequest.filter.status)
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
        length: convertData.length,
        page: Number(bodyRequest.paginator.page),
        total: bodyRequest.search.term.length > 0 ? items.count : total.length
      })
    } catch (error) {
      return res.formatter.badRequest({ message: `${error}` })
    }
  }

  updateItemByPk = async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const itemRequest: Product = {
      productCode: req.body.productCode,
      quantityPO: req.body.quantityPO,
      status: req.body.status,
      dateInputNPL: req.body.dateInputNPL,
      dateOutputFCR: req.body.dateOutputFCR
    }
    try {
      const productUpdated = await service.updateItemByPk(id, itemRequest)
      if (productUpdated) {
        const productColorUpdated = await productColorService.updateItemByProductID(productUpdated.id!, {
          productCode: productUpdated.productCode
        })
        if (productColorUpdated) {
          return res.formatter.ok({ data: productUpdated })
        } else {
          return res.formatter.badRequest({ message: 'Failed to update productCode to ProductColor!' })
        }
      }
      return res.formatter.badRequest({ message: 'Failed to update product!' })
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
}
