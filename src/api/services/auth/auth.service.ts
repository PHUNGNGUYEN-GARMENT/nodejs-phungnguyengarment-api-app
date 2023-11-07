/* eslint-disable no-unreachable */
import UserSchema, { User } from '~/models/user.model'
import * as services from '~/services/user.service'
import logging from '~/utils/logging'

const NAMESPACE = 'services/auth'

export const registerUser = async (user: User): Promise<UserSchema | null> => {
  try {
    /**
     * Checking user is already existing in the database
     * If user is already existing => send request "User already exists"
     * If user not found => Create new user
     */
    const userFind = await services.getByEmail(user.email)
    if (userFind) {
      return null
    } else {
      const newUser = await services.createNew({ ...user })
      if (newUser) {
        return newUser
      } else {
        return null
      }
    }
  } catch (error) {
    logging.error(NAMESPACE, `Error register user :: ${error}`)
    throw new Error(`Error register user :: ${error}`)
  }
}

export const loginUser = async (user: User): Promise<UserSchema | null> => {
  try {
    const userFind = await services.getByEmail(user.email)
    return userFind
  } catch (error) {
    logging.error(NAMESPACE, `Error login user :: ${error}`)
    throw new Error(`Error login user :: ${error}`)
  }
}
