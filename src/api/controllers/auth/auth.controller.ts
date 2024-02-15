import { Request, Response } from 'express'
import * as jwt from 'jsonwebtoken'
import { message } from '~/api/utils/constant'
import { tokenGenerator, verifyToken } from '~/api/utils/token-generation'
import appConfig from '~/config/app.config'
import { User } from '~/models/user.model'
import * as userRoleService from '~/services/user-role.service'
import * as service from '~/services/user.service'

const PATH = 'Auth'
const NAMESPACE = 'controllers/auth'

export default class AuthController {
  constructor() {}

  register = async (req: Request, res: Response) => {
    const userRequest: User = {
      username: req.body.username.toLowerCase(),
      password: req.body.password,
      isAdmin: req.body.isAdmin,
      status: req.body.status ?? 'active'
    }
    try {
      const userFound = await service.getItemBy({ username: userRequest.username })
      if (userFound) {
        return res.formatter.badRequest({ message: 'User is already exist!' })
      } else {
        const newUser = await service.createNewItem({ ...userRequest })
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

  checkAdmin = async (req: Request, res: Response) => {
    const accessTokenFromHeaders = String(req.headers.authorization)
    let jwtPayload
    const jwtVerified = verifyToken(accessTokenFromHeaders)
    if (!jwtVerified) res.formatter.unauthorized({ message: '123' })

    try {
      const userFound = await service.getItemBy({ accessToken: accessTokenFromHeaders })
      if (!userFound) return res.formatter.unauthorized({ message: 'Access key is not valid!' })
      jwtPayload = <any>jwt.verify(accessTokenFromHeaders, appConfig.secretKey)
      res.locals.jwtPayload = jwtPayload
    } catch (error: any) {
      return res.formatter.unauthorized({ message: `${error.message}` })
    }

    const { username, password } = jwtPayload

    try {
      const userFound = await service.getItemBy({ username: username, password: password })
      if (!userFound) return res.formatter.notFound({ message: 'User not found!' })
      const userRoles = await userRoleService.getItemsBy({ userID: userFound.id })
      if (!userRoles) return res.formatter.notFound({ message: 'User role not found!' })
      return res.formatter.ok({
        data: {
          isAdmin: userRoles.map((userRole) => userRole.role.role).includes('admin')
        }
      })
    } catch (error) {
      return res.formatter.unauthorized({ message: `${error}` })
    }
  }

  userRolesFromAccessToken = async (req: Request, res: Response) => {
    try {
      const accessTokenFromHeaders = String(req.headers.authorization)

      if (!accessTokenFromHeaders) return res.formatter.notFound({ message: 'Access token is not found!' })
      const userFromAccessToken = await service.getItemBy({ accessToken: accessTokenFromHeaders })
      if (!userFromAccessToken) return res.formatter.notFound({ message: 'Can not found user from access token!' })
      const jwtVerified = <any>jwt.verify(userFromAccessToken.accessToken, appConfig.secretKey)
      if (!jwtVerified) res.formatter.unauthorized({ message: 'Can not verify access token, please login again!' })
      const { username, password } = jwtVerified
      const userFound = await service.getItemBy({ username: username })
      if (!userFound)
        return res.formatter.notFound({ message: `Can not find user on database with username: ${username}` })
      const userRoles = await userRoleService.getItemsBy({ userID: userFound.id })
      if (!userRoles) return res.formatter.notFound({ message: 'Can not get user roles!' })
      return res.formatter.ok({ data: userRoles })
    } catch (error) {
      return res.formatter.badRequest({ message: `${error}` })
    }
  }
}
