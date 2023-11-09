import passport, { PassportStatic } from 'passport'
import passportJWT from 'passport-jwt'
import jwt from 'jsonwebtoken'
import appConfig from '~/config/app.config'
import { NextFunction } from 'express'
import * as userService from '~/services/user.service'

const controlStationBus = (req: Request, res: Response, next: NextFunction): PassportStatic => {
  const jwtExtractor = passportJWT.ExtractJwt
  const JWTStrategy = passportJWT.Strategy
  const jwtOptions = {
    jwtFromRequest: jwtExtractor.fromAuthHeaderAsBearerToken(),
    secretOrKey: appConfig.secretKey!
  }
  const strategy = new JWTStrategy(jwtOptions, (jwt_payload, next) => {
    console.log('payload received', jwt_payload)
    const user = userService.getByID(jwt_payload.id)
    if (user) {
      next(null, user)
    } else {
      next(null, false)
    }
  })
  // use the strategy
  passport.use(strategy)
  return passport
}

export default controlStationBus
