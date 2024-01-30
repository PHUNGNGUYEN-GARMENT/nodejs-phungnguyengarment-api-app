import { NextFunction, Request, Response } from 'express'
import * as jwt from 'jsonwebtoken'
import appConfig from '~/config/app.config'
import * as userRoleService from '~/services/user-role.service'
import * as userService from '~/services/user.service'
import { UserRole } from '~/type'

export const checkRole = (roles: UserRole[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    //Get the user ID from previous midleware
    const username = res.locals.jwtPayload.username
    //Get user role from the database
    try {
      const userFound = await userService.getItemBy({ username: username })
      if (!userFound) return res.formatter.notFound({ message: 'User not found!' })
      const userRolesFound = await userRoleService.getItemsBy({ userID: userFound.id })
      if (!userRolesFound) return res.formatter.notFound({ message: 'User not found' })
      if (!userRolesFound.some((userRole) => roles.includes(userRole.role.role as UserRole)) && !userFound.isAdmin)
        return res.formatter.unauthorized({})
    } catch (error) {
      return res.formatter.unauthorized({ message: `${error}` })
    }

    next()
  }
}

export const isAuthentication = async (req: Request, res: Response, next: NextFunction) => {
  //Get the jwt token from the head
  const accessTokenFromHeaders = String(req.headers.authorization)
  let jwtPayload
  // const jwtVerified = verifyToken(accessTokenFromHeaders)
  // if (!jwtVerified) res.formatter.unauthorized({ message: '123' })

  try {
    const userFound = await userService.getItemBy({ accessToken: accessTokenFromHeaders })
    if (!userFound) return res.formatter.unauthorized({ message: 'Access key is not valid!' })
    jwtPayload = <any>jwt.verify(accessTokenFromHeaders, appConfig.secretKey)
    res.locals.jwtPayload = jwtPayload
  } catch (error: any) {
    return res.formatter.unauthorized({ message: `${error.message}` })
  }

  const { username, password } = jwtPayload

  try {
    const userFound = await userService.getItemBy({ username: username, password: password })
    if (!userFound) return res.formatter.notFound({ message: 'User not found!' })
  } catch (error) {
    return res.formatter.unauthorized({ message: `${error}` })
  }
  next()
}
