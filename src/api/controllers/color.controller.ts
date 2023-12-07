import { Request, Response } from 'express'
import { Color } from '~/models/color.model'
import * as service from '~/services/color.service'
import * as productColorService from '~/services/product-color.service'
import { RequestBodyType } from '~/type'

const NAMESPACE = 'controllers/color'

export default class ColorController {
  constructor() {}

  createNewItem = async (req: Request, res: Response) => {
    const itemRequest: Color = {
      nameColor: req.body.nameColor,
      hexColor: req.body.hexColor,
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
      if (item) {
        return res.formatter.ok({ data: item })
      }
      return res.formatter.notFound({})
    } catch (error) {
      return res.formatter.badRequest({ message: `${error}` })
    }
  }

  getItemByHexColor = async (req: Request, res: Response) => {
    const hexColor = String(req.params.hexColor)
    try {
      const item = await service.getItemBy({ hexColor: hexColor })
      if (item) {
        return res.formatter.ok({ data: item })
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
    const itemRequest: Color = {
      nameColor: req.body.nameColor,
      hexColor: req.body.hexColor,
      status: req.body.status
    }
    try {
      const colorUpdated = await service.updateItemByPk(id, itemRequest)
      if (colorUpdated) {
        const productColorUpdated = await productColorService.updateItemByColorID(colorUpdated.id!, {
          hexColor: colorUpdated.hexColor,
          nameColor: colorUpdated.nameColor
        })
        if (productColorUpdated) {
          return res.formatter.ok({ data: colorUpdated })
        } else {
          return res.formatter.badRequest({ message: 'Failed to update color to ProductColor!' })
        }
      }
      return res.formatter.badRequest({ message: 'Failed to update color!' })
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
