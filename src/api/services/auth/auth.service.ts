/* eslint-disable no-unreachable */
import * as bcrypt from 'bcrypt'
import UserSchema, { User } from '~/models/user.model'
import * as services from '~/services/user.service'
import logging from '~/utils/logging'

const NAMESPACE = 'Auth'
const PATH = 'services/auth'

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
      const salt = bcrypt.genSaltSync(10)
      const hashedPassword = bcrypt.hashSync(user.hashPassword!, salt)
      const newUser = await services.createNew({ ...user, hashPassword: hashedPassword })

      if (newUser) {
        return newUser
      } else {
        return null
      }
    }
  } catch (error) {
    logging.error(NAMESPACE, `Error register ${NAMESPACE} :: ${error}`)
    throw new Error(`Register ${NAMESPACE} :: ${error}`)
  }
}

export const loginUser = async (email: string, password: string): Promise<UserSchema | null | any> => {
  try {
    const userFind = await services.getByEmail(email)
    if (userFind) {
      const passwordCompare = bcrypt.compareSync(password, userFind.hashPassword)
      if (passwordCompare) {
        // Generate token
        const userReturned = { ...userFind.toJSON() }
        delete userReturned.hashPassword
        return {
          user: userReturned
        }
      } else {
        return null
      }
    } else {
      return null
    }
  } catch (error) {
    logging.error(PATH, `Error login ${NAMESPACE} :: ${error}`)
    throw new Error(`Login ${NAMESPACE} :: ${error}`)
  }
}
