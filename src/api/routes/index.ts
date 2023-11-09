import { Application } from 'express'
import passport from '~/middleware/auth/passport.middleware'
import authRoute from '~/routes/auth/auth.route'

class AppRoutes {
  constructor(app: Application) {
    // Setting session routes
    app.use(passport.initialize())
    app.use('/api/auth', authRoute)
  }
}

export default AppRoutes
