import { PassportStatic } from 'passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import * as userService from '~/services/user.service'
import appConfig from './app.config'

const applyPassportStrategy = (passport: PassportStatic) => {
  const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    // Use the same secret used to sign the jwt token in login api
    secretOrKey: appConfig.secretKey
  }
  const jwtStrategy = new Strategy(options, async (jwt_payload, done) => {
    // passport-jwt already verified the signature. We can now use the jwt_payload.
    // We can do database request to get more information. But this may slow down our overall system.
    // Because jwt token check is perform on every secured api.
    const user = await userService.getByEmail(jwt_payload.email)
    if (user) {
      return done(null, jwt_payload)
    } else {
      return done(null, false)
    }
  })

  passport.use(jwtStrategy)
}

export default applyPassportStrategy
