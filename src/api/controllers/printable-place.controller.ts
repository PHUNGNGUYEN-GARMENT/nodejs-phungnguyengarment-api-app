import { Request, Response } from 'express'
import { PrintablePlace } from '~/models/printable-place.model'
import * as service from '~/services/printable-place.service'

const NAMESPACE = 'PrintablePlace'
const PATH = 'controllers/printable-place'

export default class PrintablePlaceController {
  constructor() {}

  createNewItem = async (req: Request, res: Response) => {
    const { items } = req.body
    try {
      const itemNew = await service.createNew(items)

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
      const item1 = await service.getByPrintID(parseInt(id))
      if (item1) {
        return res.formatter.ok({ data: item1 })
      }
      const item2 = await service.getByProductID(parseInt(id))
      if (item2) {
        return res.formatter.ok({ data: item2 })
      }
      return res.formatter.notFound({})
    } catch (error) {
      return res.formatter.badRequest({ message: `${error}` })
    }
  }

  getAllItems = async (req: Request, res: Response) => {
    // const itemRequest: PrintablePlace = {
    //   printID: req.body.printID,
    //   productID: req.body.productID
    // }
    try {
      const items = await service.getAll()
      return res.formatter.ok({ data: items })
    } catch (error) {
      return res.formatter.badRequest({ message: `${error}` })
    }
  }

  updateItemByID = async (req: Request, res: Response) => {
    const itemRequest: PrintablePlace = {
      printID: req.body.printID,
      productID: req.body.productID,
      name: req.body.name,
      orderNumber: req.body.orderNumber
    }
    try {
      const itemUpdated1 = await service.updateByPrintID(itemRequest)
      if (itemUpdated1) {
        return res.formatter.ok({ data: itemUpdated1 })
      }
      const itemUpdated2 = await service.updateByPrintID(itemRequest)
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
      const item1 = await service.deleteByPrintID(parseInt(id))
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
