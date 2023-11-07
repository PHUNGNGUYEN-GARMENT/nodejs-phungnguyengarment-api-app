import UserSchema, { User } from '~/models/user.model'
import logging from '~/utils/logging'

const NAMESPACE = 'services/users'

export const createNew = async (user: User): Promise<UserSchema> => {
  try {
    const users = await UserSchema.findAll()
    return await UserSchema.create({ ...user, orderNumber: users.length })
  } catch (error) {
    logging.error(NAMESPACE, `Error creating new user :: ${error}`)
    throw new Error(`Error creating new user :: ${error}`)
  }
}

// Get by id
export const getByID = async (id: number): Promise<UserSchema | null> => {
  try {
    const user = await UserSchema.findOne({ where: { userID: id } })
    return user
  } catch (error) {
    logging.error(NAMESPACE, `Error get user by id :: ${error}`)
    throw new Error(`Error get user by id :: ${error}`)
  }
}

// Get user by email
export const getByEmail = async (email: string): Promise<UserSchema | null> => {
  try {
    const user = await UserSchema.findOne({ where: { email: email } })
    return user
  } catch (error) {
    logging.error(NAMESPACE, `Error get user by email :: ${error}`)
    throw new Error(`Error get user by email :: ${error}`)
  }
}

// Get all
export const getAll = async (): Promise<UserSchema[]> => {
  try {
    const users = await UserSchema.findAll()
    return users
  } catch (error) {
    logging.error(NAMESPACE, `Error get all user :: ${error}`)
    throw new Error(`Error get all user :: ${error}`)
  }
}

// Update
export const updateByID = async (user: User): Promise<number> => {
  try {
    const affectedRows = await UserSchema.update(
      {
        role: user.role,
        fullname: user.fullname,
        email: user.email,
        password: user.password,
        avatar: user.avatar,
        phone: user.phone,
        workLocation: user.workLocation,
        birthday: user.birthday,
        orderNumber: user.orderNumber,
        isTemp: user.isTemp
      },
      {
        where: {
          userID: user.userID
        }
      }
    )
    return affectedRows[0]
  } catch (error) {
    logging.error(NAMESPACE, `Error get all user :: ${error}`)
    throw new Error(`Error get all user :: ${error}`)
  }
}

// Delete
export const deleteByID = async (id: number): Promise<number> => {
  try {
    const affectedRows = await UserSchema.destroy({ where: { userID: id } })
    return affectedRows
  } catch (error) {
    logging.error(NAMESPACE, `Error delete user by id :: ${error}`)
    throw new Error(`Error delete user by id :: ${error}`)
  }
}
