import { Application } from 'express'
import { PassportStatic } from 'passport'
import authRoute from '~/routes/auth/auth.route'
import productRoute from '~/routes/product.route'
import importedLotRoute from './imported-lot.route'

export default class AppRoutes {
  constructor(app: Application, passport: PassportStatic) {
    app.use('/api/auth', authRoute)
    app.use('/api/products', productRoute)
    app.use('/api/imported-lots', importedLotRoute)
  }
}
