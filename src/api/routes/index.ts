import { Application } from 'express'
import productRoute from '~/routes/product.route'
import accessoryNoteRoute from './accessory-note.route'
import colorRoute from './color.route'
import completionRoute from './completion.route'
import cuttingGroupRoute from './cutting-group.route'
import garmentAccessoryNoteRoute from './garment-accessory-note.route'
import garmentAccessoryRoute from './garment-accessory.route'
import groupRoute from './group.route'
import importationRoute from './importation.route'
import printRoute from './print.route'
import printablePlaceRoute from './printable-place.route'
import productColorRoute from './product-color.route'
import productGroupRoute from './product-group.route'
import roleRoute from './role.route'
import sampleSewingRoute from './sample-sewing.route'
import sewingLineDeliveryRoute from './sewing-line-delivery.route'
import sewingLineRoute from './sewing-line.route'
import userRoleRoute from './user-role.route'
import userRoute from './user.route'

export default class AppRoutes {
  constructor(app: Application) {
    app.use('/api/users', userRoute)
    app.use('/api/roles', roleRoute)
    app.use('/api/user-roles', userRoleRoute)
    app.use('/api/colors', colorRoute)
    app.use('/api/groups', groupRoute)
    app.use('/api/prints', printRoute)
    app.use('/api/products', productRoute)
    app.use('/api/sample-sewings', sampleSewingRoute)
    app.use('/api/sewing-lines', sewingLineRoute)
    app.use('/api/importations', importationRoute)
    app.use('/api/product-groups', productGroupRoute)
    app.use('/api/product-colors', productColorRoute)
    app.use('/api/accessory-notes', accessoryNoteRoute)
    app.use('/api/printable-places', printablePlaceRoute)
    app.use('/api/garment-accessories', garmentAccessoryRoute)
    app.use('/api/sewing-line-deliveries', sewingLineDeliveryRoute)
    app.use('/api/garment-accessory-notes', garmentAccessoryNoteRoute)
    app.use('/api/cutting-groups', cuttingGroupRoute)
    app.use('/api/completions', completionRoute)
  }
}
