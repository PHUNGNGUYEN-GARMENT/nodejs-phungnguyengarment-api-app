import { Application } from 'express'
import authRoute from '~/routes/auth/auth.route'
import productRoute from '~/routes/product.route'

class AppRoutes {
  constructor(app: Application) {
    app.use('/api/auth', authRoute)
    app.use('/api/product', productRoute)
  }
}

export default AppRoutes
