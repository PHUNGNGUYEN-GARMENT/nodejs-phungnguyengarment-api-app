import passport from 'passport'
import passportJWT from 'passport-jwt'
import * as userService from '~/services/user.service'

const jwtExtractor = passportJWT.ExtractJwt
const JWTStrategy = passportJWT.Strategy
const jwtOptions = {
  jwtFromRequest: jwtExtractor.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'abc123'
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

export default passport
