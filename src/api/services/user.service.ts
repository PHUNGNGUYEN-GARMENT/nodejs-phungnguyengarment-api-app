import UserSchema, { User } from '~/models/user.model'
import { ItemStatusType, RequestBodyType } from '~/type'
import logging from '~/utils/logging'
import { buildDynamicQuery } from '../helpers/query'

const NAMESPACE = 'services/user'

export const login = async (username: string, password: string): Promise<UserSchema | null> => {
  try {
    const userFound = await UserSchema.findOne({
      where: {
        username: username
      }
    })
    if (!userFound) throw new Error('username of user is not correct!')
    // Check password
    if (password !== userFound.password) throw new Error('Password is not correct!')
    return userFound
  } catch (error) {
    logging.error(NAMESPACE, `${error}`)
    throw new Error(`${error}`)
  }
}

export const register = async (item: User): Promise<UserSchema | null> => {
  try {
    // Check user
    const userFound = await UserSchema.findOne({ where: { username: item.username } })
    if (userFound) {
      if (userFound.status === 'un_active') {
        throw new Error('Please verify username address!')
      } else {
        throw new Error('User is already exist!')
      }
    }
    const userCreated = await UserSchema.create({ ...item })
    return userCreated
  } catch (error) {
    logging.error(NAMESPACE, `${error}`)
    throw new Error(`${error}`)
  }
}

// Get by id
export const getItemByPk = async (id: number): Promise<UserSchema | null> => {
  try {
    return await UserSchema.findByPk(id)
  } catch (error) {
    logging.error(NAMESPACE, `${error}`)
    throw new Error(`${error}`)
  }
}

export const getItemBy = async (item: User): Promise<UserSchema | null> => {
  try {
    return await UserSchema.findOne({ where: { ...item } })
  } catch (error) {
    logging.error(NAMESPACE, `${error}`)
    throw new Error(`${error}`)
  }
}

// Get all
export const getItems = async (body: RequestBodyType): Promise<{ count: number; rows: UserSchema[] }> => {
  try {
    const items = await UserSchema.findAndCountAll({
      offset: (Number(body.paginator.page) - 1) * Number(body.paginator.pageSize),
      limit: body.paginator.pageSize === -1 ? undefined : body.paginator.pageSize,
      order: [[body.sorting.column, body.sorting.direction]],
      where: buildDynamicQuery<User>(body)
    })
    return items
  } catch (error) {
    logging.error(NAMESPACE, `${error}`)
    throw new Error(`${error}`)
  }
}

export const getItemsWithStatus = async (status: ItemStatusType): Promise<UserSchema[]> => {
  try {
    return await UserSchema.findAll({
      where: {
        status: status
      }
    })
  } catch (error) {
    logging.error(NAMESPACE, `${error}`)
    throw new Error(`${error}`)
  }
}

export const getItemsCount = async (): Promise<number> => {
  try {
    return await UserSchema.count()
  } catch (error) {
    logging.error(NAMESPACE, `${error}`)
    throw new Error(`${error}`)
  }
}

// Update by productID
export const updateItemByPk = async (id: number, item: User): Promise<User | undefined> => {
  try {
    const affectedRows = await UserSchema.update(
      {
        ...item
      },
      {
        where: {
          id: id
        }
      }
    )
    return affectedRows[0] > 0 ? item : undefined
  } catch (error) {
    logging.error(NAMESPACE, `${error}`)
    throw new Error(`${error}`)
  }
}

// Delete importedID
export const deleteItemByPk = async (id: number): Promise<number> => {
  try {
    return await UserSchema.destroy({ where: { id: id } })
  } catch (error) {
    logging.error(NAMESPACE, `${error}`)
    throw new Error(`${error}`)
  }
}
