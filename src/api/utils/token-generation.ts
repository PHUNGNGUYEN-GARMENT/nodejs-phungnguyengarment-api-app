import 'dotenv/config'
import jwt from 'jsonwebtoken'
import appConfig from '~/config/app.config'
import { User } from '../models/user.model'

export const tokenGenerator = (payload: User): string => {
  const token = jwt.sign({ username: payload.username, password: payload.password }, appConfig.secretKey, {
    expiresIn: '7d',
    algorithm: 'HS256'
  })
  return token
}

export const verifyToken = (token: string): string | jwt.Jwt | jwt.JwtPayload => {
  return jwt.verify(token, appConfig.secretKey)
}
