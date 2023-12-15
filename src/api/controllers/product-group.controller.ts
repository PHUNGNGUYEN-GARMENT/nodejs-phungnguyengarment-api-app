import { Request, Response } from 'express'
import { ProductGroup } from '~/models/product-group.model'
import * as service from '~/services/product-group.service'
import { RequestBodyType } from '~/type'

const NAMESPACE = 'controllers/product-group'

export default class ProductGroupController {
  constructor() {}

  createNewItem = async (req: Request, res: Response) => {
    const itemRequest: ProductGroup = {
      productID: req.body.productID,
      groupID: req.body.groupID,
      status: req.body.status
    }
    try {
      const itemNew = await service.createNewItem(itemRequest)

      if (itemNew) {
        return res.formatter.created({ data: itemNew })
      }
      return res.formatter.badRequest({ message: `${NAMESPACE} already exists` })
    } catch (error) {
      return res.formatter.badRequest({ message: `>>> ${error}` })
    }
  }

  getItemByPk = async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    try {
      const item = await service.getItemByPk(id)
      return res.formatter.ok({ data: item })
    } catch (error) {
      return res.formatter.badRequest({ message: `${error}` })
    }
  }

  getItemByProductID = async (req: Request, res: Response) => {
    const productID = Number(req.params.productID)
    try {
      const item = await service.getItemBy({ productID: productID })
      return res.formatter.ok({ data: item })
    } catch (error) {
      return res.formatter.badRequest({ message: `${error}` })
    }
  }

  getItemByGroupID = async (req: Request, res: Response) => {
    const groupID = Number(req.params.groupID)
    try {
      const item = await service.getItemBy({ groupID: groupID })
      return res.formatter.ok({ data: item })
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
      return res.formatter.ok({
        data: items.rows,
        length: items.rows.length,
        page: Number(bodyRequest.paginator.page),
        total: bodyRequest.search.term.length > 0 ? items.count : total.length
      })
    } catch (error) {
      return res.formatter.badRequest({ message: `${error}` })
    }
  }

  updateItemByPk = async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const itemRequest: ProductGroup = {
      productID: req.body.productID,
      groupID: req.body.groupID,
      status: req.body.status
    }
    try {
      const itemUpdated = await service.updateItemByPk(id, itemRequest)
      if (itemUpdated) {
        return res.formatter.ok({ data: itemUpdated })
      }
      return res.formatter.badRequest({})
    } catch (error) {
      return res.formatter.badRequest({ message: `${error}` })
    }
  }

  updateItemByProductID = async (req: Request, res: Response) => {
    const productID = Number(req.params.productID)
    const itemRequest: ProductGroup = {
      groupID: req.body.groupID,
      status: req.body.status
    }
    try {
      const itemUpdated = await service.updateItemByProductID(productID, itemRequest)
      if (itemUpdated) {
        return res.formatter.ok({ data: itemUpdated })
      }
      return res.formatter.badRequest({})
    } catch (error) {
      return res.formatter.badRequest({ message: `${error}` })
    }
  }

  updateItemByGroupID = async (req: Request, res: Response) => {
    const groupID = Number(req.params.groupID)
    const itemRequest: ProductGroup = {
      productID: req.body.productID,
      status: req.body.status
    }
    try {
      const itemUpdated = await service.updateItemByGroupID(groupID, itemRequest)
      if (itemUpdated) {
        return res.formatter.ok({ data: itemUpdated })
      }
      return res.formatter.badRequest({})
    } catch (error) {
      return res.formatter.badRequest({ message: `${error}` })
    }
  }

  createOrUpdateItemByPk = async (req: Request, res: Response) => {
    const itemRequest: ProductGroup = {
      id: req.body.id,
      productID: req.body.productID,
      groupID: req.body.groupID,
      status: req.body.status
    }
    try {
      const itemUpdated = await service.createOrUpdateItemByPk(itemRequest.id!, itemRequest)
      if (itemUpdated) {
        return res.formatter.ok({ data: itemUpdated })
      }
      return res.formatter.badRequest({})
    } catch (error) {
      return res.formatter.badRequest({ message: `${error}` })
    }
  }

  createOrUpdateItemByProductID = async (req: Request, res: Response) => {
    const itemRequest: ProductGroup = {
      productID: Number(req.params.productID),
      groupID: req.body.groupID,
      status: req.body.status
    }
    try {
      const itemUpdated = await service.createOrUpdateItemByProductID(itemRequest.productID!, itemRequest)
      if (itemUpdated) {
        return res.formatter.ok({ data: itemUpdated })
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

  deleteItemByProductID = async (req: Request, res: Response) => {
    const productID = Number(req.params.productID)
    try {
      const item = await service.deleteItemByProductID(productID)
      if (item) {
        return res.formatter.ok({ message: `${NAMESPACE} has been deleted` })
      }
      return res.formatter.notFound({})
    } catch (error) {
      return res.formatter.badRequest({ message: `${error}` })
    }
  }

  deleteItemByGroupID = async (req: Request, res: Response) => {
    const groupID = Number(req.params.groupID)
    try {
      const item = await service.deleteItemByGroupID(groupID)
      if (item) {
        return res.formatter.ok({ message: `${NAMESPACE} has been deleted` })
      }
      return res.formatter.notFound({})
    } catch (error) {
      return res.formatter.badRequest({ message: `${error}` })
    }
  }
}
