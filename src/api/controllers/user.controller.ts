import { Request, Response } from 'express'
import randToken from 'rand-token'
import { User } from '~/models/user.model'
import * as service from '~/services/user.service'
import { RequestBodyType } from '~/type'
import { message } from '../utils/constant'
import { tokenGenerator } from '../utils/token-generation'

const PATH = 'controllers/user'
const NAMESPACE = 'User'

export default class UserController {
  constructor() {}

  register = async (req: Request, res: Response) => {
    const userRequest: User = {
      username: req.body.username.toLowerCase(),
      password: req.body.password,
      status: req.body.status ?? 'active'
    }
    try {
      const userFound = await service.getItemBy({ username: userRequest.username })
      if (userFound) {
        return res.formatter.badRequest({ message: 'User is already exist!' })
      } else {
        const newUser = await service.createNewItem({ username: userRequest.username, password: userRequest.password! })
        if (newUser) {
          // Send verify username of user...
          return res.formatter.created({ data: newUser, message: message.REGISTER_SUCCESS })
        } else {
          return res.formatter.badRequest({ message: message.REGISTER_FAILED })
        }
      }
    } catch (error) {
      return res.formatter.badRequest({ message: `${error}` })
    }
  }

  login = async (req: Request, res: Response) => {
    const itemRequest = {
      username: req.body.username.toLowerCase(),
      password: req.body.password
    }
    try {
      const userFound = await service.getItemBy({ username: itemRequest.username })
      // Check password
      if (userFound && itemRequest.password !== userFound?.password)
        return res.formatter.unauthorized({ message: 'Password is not correct!' })
      if (!userFound) return res.formatter.badRequest({ message: 'User not found!' })
      const accessToken = tokenGenerator({ username: userFound.username, password: userFound.password })
      if (!accessToken) return res.formatter.unauthorized({ message: message.LOGIN_FAILED })
      let refreshToken = randToken.generate(100) // 100 is refresh token size
      if (!userFound.refreshToken) {
        await service.updateItemByPk(userFound.id, { refreshToken: refreshToken }) // Update refresh token if token is not existing database
      } else {
        refreshToken = userFound.refreshToken
      }
      return res.formatter.ok({
        data: { ...userFound.dataValues, refreshToken: refreshToken, accessToken: accessToken },
        message: message.LOGIN_SUCCESS
      })
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

  getItemByUsername = async (req: Request, res: Response) => {
    const username = String(req.params.username)
    try {
      const item = await service.getItemBy({ username: username })
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
        return res.formatter.ok({ message: message.DELETED })
      }
      return res.formatter.badRequest({ message: message.DELETE_FAILED })
    } catch (error) {
      return res.formatter.badRequest({ message: `${error}` })
    }
  }
}
