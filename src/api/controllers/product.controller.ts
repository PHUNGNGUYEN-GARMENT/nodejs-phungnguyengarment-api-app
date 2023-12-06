import { Request, Response } from 'express'
import { Product } from '~/models/product.model'
import * as colorService from '~/services/color.service'
import * as productColorService from '~/services/product-color.service'
import * as service from '~/services/product.service'
import { RequestBodyType } from '~/type'
import { ProductColor } from '../models/product-color.model'

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
    const colorID = Number(req.body.colorID)
    try {
      const itemNew = await service.createNewItem(dataRequest)
      if (itemNew) {
        const itemProductColorNew = await productColorService.createNewItem({
          colorID: colorID,
          productID: itemNew.id,
          status: 'active'
        })
        if (itemProductColorNew) {
          return res.formatter.created({ data: itemNew, meta: itemProductColorNew })
        }
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
      const bodyRequest: RequestBodyType = {
        ...req.body
      }
      const items = await service.getItems(bodyRequest)
      const total = await service.getItemsWithStatus(bodyRequest.filter.status)
      const colorItems = await colorService.getItems(bodyRequest)

      const convertData = items.rows.map((item) => {
        const getColor = colorItems.rows.find(
          (color) => color.id === (item.productColor as unknown as ProductColor[])[0].colorID ?? -1
        )
        return {
          ...item.dataValues,
          productColor: getColor ? getColor : null,
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
      return res.formatter.badRequest({})
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
