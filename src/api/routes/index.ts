import { Application } from 'express'
import { PassportStatic } from 'passport'
import authRoute from '~/routes/auth/auth.route'
import productRoute from '~/routes/product.route'
import colorRoute from './color.route'
import garmentAccessoryNoteRoute from './garment-accessory-note.route'
import garmentAccessoryRoute from './garment-accessory.route'
import groupRoute from './group.route'
import importationRoute from './importation.route'
import notionAccessoryRoute from './notion-accessory.route'
import printRoute from './print.route'
import printablePlaceRoute from './printable-place.route'
import productColorRoute from './product-color.route'
import productGroupRoute from './product-group.route'
import sewingLineDeliveryRoute from './sewing-line-delivery.route'
import sewingLineRoute from './sewing-line.route'

export default class AppRoutes {
  constructor(app: Application, passport: PassportStatic) {
    app.use('/api/auth', authRoute)
    app.use('/api/colors', colorRoute) // Done (Checked)
    app.use('/api/groups', groupRoute) // Done (Checked)
    app.use('/api/prints', printRoute) // Done (Checked)
    app.use('/api/products', productRoute) // Done (Checked)
    app.use('/api/sewing-line', sewingLineRoute) // Done (Checked)
    app.use('/api/importations', importationRoute) // Done (Checked)
    app.use('/api/product-groups', productGroupRoute) // Done
    app.use('/api/product-colors', productColorRoute) // Done (Checked)
    app.use('/api/printable-places', printablePlaceRoute) // Done (Checked)
    app.use('/api/notion-accessories', notionAccessoryRoute)
    app.use('/api/garment-accessories', garmentAccessoryRoute)
    app.use('/api/garment-accessory-note', garmentAccessoryNoteRoute)
    app.use('/api/sewing-line-deliveries', sewingLineDeliveryRoute) // Done (Checked)
  }
}
