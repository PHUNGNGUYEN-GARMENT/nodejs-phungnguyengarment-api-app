import { Request, Response } from 'express'
import { User } from '~/models/user.model'
import * as service from '~/services/user.service'

const PATH = 'controllers/user'
const NAMESPACE = 'User'

export default class UserController {
  constructor() {}
  createNewUser = async (req: Request, res: Response) => {
    const userRequest: User = {
      fullName: req.body.fullName,
      email: req.body.email,
      hashPassword: req.body.password,
      workLocation: req.body.workLocation,
      role: req.body.role
    }
    try {
      const newUser = await service.createNew(userRequest)

      if (newUser) {
        return res.formatter.created({ data: newUser })
      } else {
        return res.formatter.badRequest({ message: `${NAMESPACE} already exists` })
      }
    } catch (error) {
      return res.formatter.badRequest({ message: `${error}` })
    }
  }

  getUserByID = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
      const user = await service.getByID(parseInt(id))
      if (user) {
        return res.formatter.ok({ data: user })
      } else {
        return res.formatter.badRequest({})
      }
    } catch (error) {
      return res.formatter.badRequest({ message: `${error}` })
    }
  }

  getAllUsers = async (req: Request, res: Response) => {
    try {
      const users = await service.getAll()
      return res.formatter.ok({ data: users })
    } catch (error) {
      return res.formatter.badRequest({ message: `${error}` })
    }
  }

  updateUserByID = async (req: Request, res: Response) => {
    const userRequest: User = {
      userID: req.body.userID,
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
      const userUpdated = await service.updateByID(userRequest)
      if (userUpdated) {
        return res.formatter.ok({ data: userUpdated })
      } else {
        return res.formatter.badRequest({})
      }
    } catch (error) {
      return res.formatter.badRequest({ message: `${error}` })
    }
  }

  deleteUserByID = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
      const user = await service.deleteByID(parseInt(id))
      if (user) {
        return res.formatter.ok({ message: `${NAMESPACE} has been deleted` })
      } else {
        return res.formatter.badRequest({})
      }
    } catch (error) {
      return res.formatter.badRequest({ message: `${error}` })
    }
  }
}
