import { Request, Response } from 'express'
import { GarmentAccessory } from '~/models/garment-accessory.model'
import * as service from '~/services/garment-accessory.service'

const NAMESPACE = 'GarmentAccessory'
const PATH = 'controllers/garment-accessory'

export default class GarmentAccessoryController {
  constructor() {}

  createNewItem = async (req: Request, res: Response) => {
    const itemRequest: GarmentAccessory = {
      productID: req.body.productID,
      notesOther: req.body.productID,
      amountCuttingAccessory: req.body.productID,
      dateDeliveredChain: req.body.productID,
      syncGarmentAccessoryState: req.body.productID,
      syncPackageAccessoryState: req.body.productID
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
      const item1 = await service.getByID(parseInt(id))
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
    try {
      const items = await service.getAll()
      return res.formatter.ok({ data: items })
    } catch (error) {
      return res.formatter.badRequest({ message: `${error}` })
    }
  }

  updateItemByID = async (req: Request, res: Response) => {
    const itemRequest: GarmentAccessory = {
      garmentAccessoryID: req.body.garmentAccessoryID,
      productID: req.body.productID,
      notesOther: req.body.notesOther,
      amountCuttingAccessory: req.body.amountCuttingAccessory,
      dateDeliveredChain: req.body.dateDeliveredChain,
      syncGarmentAccessoryState: req.body.syncGarmentAccessoryState,
      syncPackageAccessoryState: req.body.syncPackageAccessoryState,
      orderNumber: req.body.orderNumber
    }
    try {
      const itemUpdated = await service.updateByID(itemRequest)
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
      const item = await service.deleteByID(parseInt(id))
      if (item) {
        return res.formatter.ok({ message: `${NAMESPACE} has been deleted` })
      }
      return res.formatter.notFound({})
    } catch (error) {
      return res.formatter.badRequest({ message: `${error}` })
    }
  }
}
