import { PassportStatic } from 'passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import appConfig from '~/config/app.config'
import * as userService from '~/services/user.service'

const applyPassportStrategy = (passport: PassportStatic) => {
  const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: appConfig.secretKey
  }
  const strategy = new Strategy(jwtOptions, (payload, done) => {
    const user = userService.getByEmail(payload.email)
    if (user) {
      return done(null, user)
    } else {
      return done(null, false)
    }
  })
  // use the strategy
  passport.use(strategy)
}

export default applyPassportStrategy
