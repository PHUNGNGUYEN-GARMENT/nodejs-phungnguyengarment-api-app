import { Application } from 'express'
import authRoute from '~/routes/auth/auth.route'

class AppRoutes {
  constructor(app: Application) {
    app.use('/api/auth', authRoute)
  }
}

export default AppRoutes
