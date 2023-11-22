import { Application } from 'express'
import { PassportStatic } from 'passport'
import authRoute from '~/routes/auth/auth.route'
import productRoute from '~/routes/product.route'
import colorRoute from './color.route'
import garmentAccessoryNoteRoute from './garment-accessory-note.route'
import garmentAccessoryRoute from './garment-accessory.route'
import groupRoute from './group.route'
import importationRoute from './importation.route'
import importedLotRoute from './imported-lot.route'
import notionAccessoryRoute from './notion-accessory.route'
import printRoute from './print.route'
import printablePlaceRoute from './printable-place.route'
import productColorRoute from './product-color.route'
import productGroupRoute from './product-group.route'
import sewingLineDeliveryRoute from './sewing-line-delivery.route'

export default class AppRoutes {
  constructor(app: Application, passport: PassportStatic) {
    app.use('/api/auth', authRoute)
    app.use('/api/products', productRoute)
    app.use('/api/imported-lots', importedLotRoute)
    app.use('/api/importations', importationRoute)
    app.use('/api/colors', colorRoute)
    app.use('/api/product-colors', productColorRoute)
    app.use('/api/groups', groupRoute)
    app.use('/api/prints', printRoute)
    app.use('/api/printable-places', printablePlaceRoute)
    app.use('/api/sewing-line-deliveries', sewingLineDeliveryRoute)
    app.use('/api/product-groups', productGroupRoute)
    app.use('/api/garment-accessory-note', garmentAccessoryNoteRoute)
    app.use('/api/notion-accessories', notionAccessoryRoute)
    app.use('/api/garment-accessories', garmentAccessoryRoute)
  }
}
