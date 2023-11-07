import { Request, Response } from 'express'
import { User } from '~/models/user.model'
import * as service from '~/services/user.service'

export default class UserController {
  constructor() {}
  createNewUser = async (req: Request, res: Response) => {
    const userRequest: User = {
      fullname: req.body.fullname,
      email: req.body.email,
      password: req.body.password,
      workLocation: req.body.workLocation,
      role: req.body.role
    }
    try {
      const newUser = await service.createNew(userRequest)

      if (newUser) {
        return res.formatter.created({ status: 201, data: newUser })
      } else {
        return res.formatter.badRequest({ status: 404, message: 'User already exists' })
      }
    } catch (error) {
      return res.formatter.badRequest({ status: 400, message: `${error}` })
    }
  }

  getUserByID = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
      const user = await service.getByID(parseInt(id))
      if (user) {
        return res.formatter.ok({ status: 200, data: user })
      } else {
        return res.formatter.badRequest({ status: 400 })
      }
    } catch (error) {
      return res.formatter.badRequest({ status: 400, message: `${error}` })
    }
  }

  getAllUsers = async (req: Request, res: Response) => {
    try {
      const users = await service.getAll()
      return res.formatter.ok({ status: 200, data: users })
    } catch (error) {
      return res.formatter.badRequest({ status: 400, message: `${error}` })
    }
  }

  updateUserByID = async (req: Request, res: Response) => {
    const { id } = req.params
    const userRequest: User = {
      userID: parseInt(id),
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
      const userUpdated = await service.updateByID(userRequest)
      if (userUpdated) {
        return res.formatter.ok({ status: 200, data: userUpdated })
      } else {
        return res.formatter.badRequest({ status: 400 })
      }
    } catch (error) {
      return res.formatter.badRequest({ status: 400, message: `${error}` })
    }
  }

  deleteUserByID = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
      const user = await service.deleteByID(parseInt(id))
      if (user) {
        return res.formatter.ok({ status: 200, message: 'User has been deleted' })
      } else {
        return res.formatter.badRequest({ status: 400 })
      }
    } catch (error) {
      return res.formatter.badRequest({ status: 400, message: `${error}` })
    }
  }
}
