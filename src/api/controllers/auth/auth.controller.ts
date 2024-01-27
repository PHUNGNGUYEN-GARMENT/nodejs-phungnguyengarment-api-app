import { Request, Response } from 'express'
import { message } from '~/api/utils/constant'
import { tokenGenerator } from '~/api/utils/token-generation'
import { User } from '~/models/user.model'
import * as service from '~/services/user.service'

const PATH = 'Auth'
const NAMESPACE = 'controllers/auth'

export default class AuthController {
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
      await service.updateItemByPk(userFound.id, { accessToken: accessToken }) // Update refresh token if token is not existing database
      return res.formatter.ok({
        data: { ...userFound.dataValues, accessToken: accessToken },
        message: message.LOGIN_SUCCESS
      })
    } catch (error) {
      return res.formatter.badRequest({ message: `${error}` })
    }
  }
}
