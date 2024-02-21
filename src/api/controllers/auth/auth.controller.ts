import { Request, Response } from 'express'
import * as jwt from 'jsonwebtoken'
import { message } from '~/api/utils/constant'
import { otpGenerator, tokenGenerator, verifyToken } from '~/api/utils/token-generation'
import appConfig from '~/config/app.config'
import { mailOptions, transporter } from '~/config/nodemailer.config'
import { User } from '~/models/user.model'
import * as userRoleService from '~/services/user-role.service'
import * as service from '~/services/user.service'

const PATH = 'Auth'
const NAMESPACE = 'controllers/auth'

export default class AuthController {
  constructor() {}

  register = async (req: Request, res: Response) => {
    try {
      const userRequest: User = {
        email: req.body.email.toLowerCase(),
        password: req.body.password,
        isAdmin: req.body.isAdmin,
        status: req.body.status ?? 'active'
      }
      const userFound = await service.getItemBy({ email: userRequest.email })
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
      email: req.body.email.toLowerCase(),
      password: req.body.password
    }
    try {
      const userFound = await service.getItemBy({ email: itemRequest.email })
      // Check password
      if (userFound && itemRequest.password !== userFound?.password)
        return res.formatter.unauthorized({ message: 'Password is not correct!' })
      if (!userFound) return res.formatter.badRequest({ message: 'User not found!' })
      const accessToken = tokenGenerator({ email: userFound.email, password: userFound.password })
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

  sendEmailOTPCode = async (req: Request, res: Response) => {
    try {
      const { email } = req.params
      const otp = otpGenerator(6)
      await transporter
        .sendMail(mailOptions(email, otp))
        .then(async () => {
          const itemUpdated = await service.updateItemByEmail(email, { otp: otp })
          if (!itemUpdated) return res.formatter.badGateway({})
          return res.formatter.ok({
            message: `We have sent an authentication otp code to your email address, please check your email!`
          })
        })
        .catch((err) => {
          return res.formatter.badGateway(`${err}`)
        })
    } catch (err) {
      return res.formatter.badRequest({ message: `${err}` })
    }
  }

  verifyOTP = async (req: Request, res: Response) => {
    const { email } = req.params
    const { otp } = req.body
    try {
      const userFound = await service.getItemBy({ email: email })
      if (!userFound) return res.formatter.notFound({ message: 'User not found!' })
      if (otp !== userFound.otp) return res.formatter.badGateway({ message: 'OTP code is incorrect!!!' })
      await service
        .updateItemByPk(userFound.id, { otp: null })
        .then((user) => {
          return res.formatter.ok({ data: user })
        })
        .catch((err) => {
          throw new Error(`${err}`)
        })
    } catch (err) {
      return res.formatter.badRequest({ message: `${err}` })
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
      const userFound = await service.getItemBy({ email: username, password: password })
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
      const { email, password } = jwtVerified
      const userFound = await service.getItemBy({ email: email })
      if (!userFound) return res.formatter.notFound({ message: `Can not find user on database with email: ${email}` })
      const userRoles = await userRoleService.getItemsBy({ userID: userFound.id })
      if (!userRoles) return res.formatter.notFound({ message: 'Can not get user roles!' })
      return res.formatter.ok({ data: userRoles, meta: userFound })
    } catch (error) {
      return res.formatter.badRequest({ message: `${error}` })
    }
  }

  userFromAccessToken = async (req: Request, res: Response) => {
    try {
      const accessTokenFromHeaders = String(req.headers.authorization)

      if (!accessTokenFromHeaders) return res.formatter.notFound({ message: 'Access token is not found!' })
      const userFromAccessToken = await service.getItemBy({ accessToken: accessTokenFromHeaders })
      if (!userFromAccessToken) return res.formatter.notFound({ message: 'Can not found user from access token!' })
      const jwtVerified = <any>jwt.verify(userFromAccessToken.accessToken, appConfig.secretKey)
      if (!jwtVerified) res.formatter.unauthorized({ message: 'Can not verify access token, please login again!' })
      const { email, password } = jwtVerified
      const userFound = await service.getItemBy({ email: email })
      if (!userFound) return res.formatter.notFound({ message: `Can not find user on database with email: ${email}` })
      return res.formatter.ok({ data: userFound })
    } catch (error) {
      return res.formatter.badRequest({ message: `${error}` })
    }
  }
}
