import { Request, Response } from 'express'
import { User } from '~/models/user.model'
import * as services from '~/services/auth/auth.service'
import logging from '~/utils/logging'

const NAMESPACE = 'controllers/auth'

export default class AuthController {
  constructor() {}

  // Get by id
  login = async (req: Request, res: Response) => {
    const { username, email, password } = req.body
    try {
      console.log('')
    } catch (error) {
      return res.formatter.badRequest({ message: `${error}` })
    }
  }

  // Get all
  register = async (req: Request, res: Response) => {
    const userRequest: User = {
      fullname: req.body.fullname,
      email: req.body.email,
      password: req.body.password,
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
        return res.formatter.created({ status: 201, message: `User registered successfully!`, data: userRegistered })
      } else {
        return res.formatter.badRequest({ status: 400, message: `User already exist` })
      }
    } catch (error) {
      logging.error(NAMESPACE, `User register failed with error: ${error}`)
      return res.formatter.badRequest({ message: `User register failed with error: ${error}` })
    }
  }
}
