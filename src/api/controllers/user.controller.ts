import { Request, Response } from 'express'
import { User } from '~/models/user.model'
import * as userRoleService from '~/services/user-role.service'
import * as service from '~/services/user.service'
import { RequestBodyType } from '~/type'
import { message } from '../utils/constant'

const PATH = 'controllers/user'
const NAMESPACE = 'User'

export default class UserController {
  constructor() {}

  createNewItem = async (req: Request, res: Response) => {
    const itemRequest: User = {
      ...req.body,
      status: req.body.status ?? 'active'
    }
    try {
      const itemNew = await service.createNewItem(itemRequest)

      if (itemNew) {
        return res.formatter.created({ data: itemNew, message: message.CREATED })
      }
      return res.formatter.badRequest({ message: message.CREATION_FAILED })
    } catch (error) {
      return res.formatter.badRequest({ message: `${error}` })
    }
  }

  getUserByPk = async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    try {
      const item = await service.getItemByPk(id)
      if (item) {
        return res.formatter.ok({ data: item, message: message.SUCCESS })
      }
      return res.formatter.notFound({ message: message.NOT_FOUND })
    } catch (error) {
      return res.formatter.badRequest({ message: `${error}` })
    }
  }

  getItemByEmail = async (req: Request, res: Response) => {
    const email = String(req.params.email)
    try {
      const item = await service.getItemBy({ email: email })
      if (item) {
        return res.formatter.ok({ data: item, message: message.SUCCESS })
      }
      return res.formatter.notFound({ message: message.NOT_FOUND })
    } catch (error) {
      return res.formatter.badRequest({ message: `${error}` })
    }
  }

  getAllUsers = async (req: Request, res: Response) => {
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
        pageSize: Number(bodyRequest.paginator.pageSize),
        total: bodyRequest.search.term.length > 0 ? items.count : total.length,
        message: message.SUCCESS
      })
    } catch (error) {
      return res.formatter.badRequest({ message: `${error}` })
    }
  }

  updateUserByEmail = async (req: Request, res: Response) => {
    const email = req.params.email
    const itemRequest: User = {
      ...req.body
    }
    try {
      const itemUpdated = await service.updateItemByEmail(email, itemRequest)
      if (itemUpdated) {
        return res.formatter.ok({ data: itemUpdated, message: message.UPDATED })
      }
      return res.formatter.badRequest({ message: message.UPDATE_FAILED })
    } catch (error) {
      return res.formatter.badRequest({ message: `${error}` })
    }
  }

  updateUserByPk = async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const itemRequest: User = {
      ...req.body
    }
    try {
      const itemUpdated = await service.updateItemByPk(id, itemRequest)
      if (itemUpdated) {
        return res.formatter.ok({ data: itemUpdated, message: message.UPDATED })
      }
      return res.formatter.badRequest({ message: message.UPDATE_FAILED })
    } catch (error) {
      return res.formatter.badRequest({ message: `${error}` })
    }
  }

  deleteItemByPk = async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    try {
      const item = await service.deleteItemByPk(id)
      if (item) {
        const roleItemsToDelete = await userRoleService.deleteItemsByUserID(id)
        if (!roleItemsToDelete) return res.formatter.badRequest({ message: 'Can not delete user roles!' })
        return res.formatter.ok({ message: message.DELETED })
      }
      return res.formatter.badRequest({ message: message.DELETE_FAILED })
    } catch (error) {
      return res.formatter.badRequest({ message: `${error}` })
    }
  }
}
