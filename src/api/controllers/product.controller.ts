import { Request, Response } from 'express'
import { Product } from '~/models/product.model'
import * as service from '~/services/product.service'
import { RequestBodyType } from '~/type'

const NAMESPACE = 'controllers/product'

class ProductController {
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
      const newProd = await service.createNewItem(dataRequest)
      if (newProd) {
        return res.formatter.created({ data: newProd })
      }
      return res.formatter.badRequest({})
    } catch (error) {
      return res.formatter.badRequest({})
    }
  }

  createOrUpdateItemByPk = async (req: Request, res: Response) => {
    const dataRequest: Product = {
      id: Number(req.params.id),
      productCode: req.body.productCode,
      quantityPO: req.body.quantityPO,
      status: req.body.status,
      dateInputNPL: req.body.dateInputNPL,
      dateOutputFCR: req.body.dateOutputFCR
    }
    try {
      const newProd = await service.createOrUpdateItemByPk(dataRequest.id!, { ...dataRequest })
      if (newProd) {
        return res.formatter.ok({ data: newProd })
      }
      return res.formatter.badRequest({})
    } catch (error) {
      return res.formatter.badRequest({})
    }
  }

  getItemByPk = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id)
      const item = await service.getItemByPk(id)

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
      return res.formatter.badRequest({ message: `${NAMESPACE}/${error}` })
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
        return res.formatter.ok({ data: productUpdated })
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
}

export default ProductController
