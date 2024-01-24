import 'dotenv/config'
import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import appConfig from '~/config/app.config'

export const tokenGenerator = (user: { username: string; password: string }): string => {
  const token = jwt.sign(user, appConfig.secretKey, { expiresIn: '7d' })
  return token
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '')
  if (!token) return res.formatter.unauthorized({ message: 'User unauthorized!' }) // Unauthorized
  jwt.verify(token, appConfig.secretKey, (err, user) => {
    if (err) return res.formatter.forbidden({}) // Forbidden
    req.body = user
    next()
  })
}
