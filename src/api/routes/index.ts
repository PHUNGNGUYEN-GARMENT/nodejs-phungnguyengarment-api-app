import { Application } from 'express'
import { PassportStatic } from 'passport'
import authRoute from '~/routes/auth/auth.route'
import productRoute from '~/routes/product.route'
import colorRoute from './color.route'
import importationRoute from './importation.route'
import importedLotRoute from './imported-lot.route'
import productColorRoute from './product-color.route'

export default class AppRoutes {
  constructor(app: Application, passport: PassportStatic) {
    app.use('/api/auth', authRoute)
    app.use('/api/products', productRoute)
    app.use('/api/imported-lots', importedLotRoute)
    app.use('/api/importations', importationRoute)
    app.use('/api/colors', colorRoute)
    app.use('/api/product-colors', productColorRoute)
  }
}
