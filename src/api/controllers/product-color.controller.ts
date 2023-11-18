import { Request, Response } from 'express'
import { ProductColor } from '~/models/product-color.model'
import * as service from '~/services/product-color.service'

const NAMESPACE = 'ProductColor'
const PATH = 'controllers/product-color'

export default class ProductColorController {
  constructor() {}

  createNewItem = async (req: Request, res: Response) => {
    const itemRequest: ProductColor = {
      productID: req.body.productID,
      nameColor: req.body.nameColor,
      rgbColor: req.body.rgbColor,
      hexColor: req.body.hexColor,
      cmykColor: req.body.cmykColor,
      hsvColor: req.body.hexColor,
      hslColor: req.body.hexColor
    }
    try {
      const itemNew = await service.createNew(itemRequest)

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
      const item1 = await service.getByColorID(parseInt(id))
      const item2 = await service.getByProductID(parseInt(id))
      if (item1) {
        return res.formatter.ok({ data: item1 })
      }
      if (item2) {
        return res.formatter.ok({ data: item2 })
      }
      return res.formatter.notFound({})
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
    const itemRequest: ProductColor = {
      colorID: req.body.colorID,
      productID: req.body.productID,
      nameColor: req.body.nameColor,
      rgbColor: req.body.rgbColor,
      cmykColor: req.body.cmykColor,
      hexColor: req.body.hexColor,
      hslColor: req.body.hslColor,
      hsvColor: req.body.hsvColor,
      orderNumber: req.body.orderNumber
    }
    try {
      const itemUpdated1 = await service.updateByColorID(itemRequest)
      if (itemUpdated1) {
        return res.formatter.ok({ data: itemUpdated1 })
      }
      const itemUpdated2 = await service.updateByProductID(itemRequest)
      if (itemUpdated2) {
        return res.formatter.ok({ data: itemUpdated2 })
      }
      return res.formatter.badRequest({})
    } catch (error) {
      return res.formatter.badRequest({ message: `${error}` })
    }
  }

  deleteItemByID = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
      const item1 = await service.deleteByColorID(parseInt(id))
      if (item1) {
        return res.formatter.ok({ message: `${NAMESPACE} has been deleted` })
      }
      const item2 = await service.deleteByProductID(parseInt(id))
      if (item2) {
        return res.formatter.ok({ message: `${NAMESPACE} has been deleted` })
      }
      return res.formatter.notFound({})
    } catch (error) {
      return res.formatter.badRequest({ message: `${error}` })
    }
  }
}
