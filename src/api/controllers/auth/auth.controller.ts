import { Request, Response } from 'express'
import { User } from '~/models/user.model'
import * as services from '~/services/auth/auth.service'
import logging from '~/utils/logging'

const PATH = 'Auth'
const NAMESPACE = 'controllers/auth'

export default class AuthController {
  constructor() {}

  // Get by id
  login = async (req: Request, res: Response) => {
    const { email, password } = req.body
    try {
      const user = await services.loginUser(email, password)
      if (user) {
        return res.formatter.ok({ status: 200, message: `${NAMESPACE} login successfully!`, data: user })
      } else {
        return res.formatter.badRequest({ status: 401, message: `Invalid email and password!` })
      }
    } catch (error) {
      logging.error(PATH, `${NAMESPACE} login failed with error: ${error}`)
      return res.formatter.badRequest({ message: `${error}` })
    }
  }

  // Get all
  register = async (req: Request, res: Response) => {
    const userRequest: User = {
      fullName: req.body.fullName,
      email: req.body.email,
      hashPassword: req.body.password,
      avatar: req.body.avatar,
      phone: req.body.phone,
      workLocation: req.body.workLocation,
      birthday: req.body.birthday,
      role: req.body.role,
      orderNumber: req.body.orderNumber
    }
    try {
      const userRegistered = await services.registerUser(userRequest)
      if (userRegistered) {
        return res.formatter.created({
          status: 201,
          message: `${NAMESPACE} registered successfully!`,
          data: userRegistered
        })
      } else {
        return res.formatter.badRequest({ status: 400, message: `${NAMESPACE} already exist` })
      }
    } catch (error) {
      logging.error(PATH, `${NAMESPACE} register failed with error: ${error}`)
      return res.formatter.badRequest({ message: `${NAMESPACE} register failed with error: ${error}` })
    }
  }
}
