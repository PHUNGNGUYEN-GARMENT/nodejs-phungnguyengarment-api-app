import jwt from 'jsonwebtoken'
import appConfig from '~/config/app.config'

const generateAccessToken = (payload: string | Buffer | object) => {
  return jwt.sign(payload, appConfig.secretKey, { expiresIn: '2 minutes' })
}

export default generateAccessToken
