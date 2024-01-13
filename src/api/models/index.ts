import { Sequelize } from 'sequelize-typescript'
import configuration from '~/config/database.config'
import logging from '~/utils/logging'
import AccessoryNoteSchema from './accessory-note.model'
import ColorSchema from './color.model'
import CuttingGroupSchema from './cutting-group.model'
import GarmentAccessoryNoteSchema from './garment-accessory-note.model'
import GarmentAccessorySchema from './garment-accessory.model'
import GroupSchema from './group.model'
import ImportationSchema from './importation.model'
import PrintSchema from './print.model'
import PrintablePlaceSchema from './printable-place.model'
import ProductColorSchema from './product-color.model'
import ProductGroupSchema from './product-group.model'
import ProductSchema from './product.model'
import SampleSewingSchema from './sample-sewing.model'
import SewingLineDeliverySchema from './sewing-line-delivery.model'
import SewingLineSchema from './sewing-line.model'
import UserSchema from './user.model'

const PATH = 'model/index'

const { database, host, username, password } = configuration.development

class DBConnection {
  public sequelize: Sequelize | undefined

  constructor() {
    this.createConnection()
  }

  async createConnection() {
    this.sequelize = new Sequelize({
      database: database,
      username: username,
      password: password,
      host: host,
      dialect: 'mysql',
      pool: {
        max: 5, //Số lượng kết nối tối đa trong pool.
        min: 0, //Số lượng kết nối tối thiểu trong pool.
        acquire: 30000, //Thời gian tối đa để một kết nối được thực hiện, tính bằng mili giây.
        idle: 10000 //Thời gian tối đa một kết nối có thể ở trong pool mà không được sử dụng, tính bằng mili giây.
      }
    })

    this.sequelize?.addModels([
      UserSchema,
      ColorSchema,
      GroupSchema,
      PrintSchema,
      ProductSchema,
      SewingLineSchema,
      ImportationSchema,
      SampleSewingSchema,
      ProductColorSchema,
      ProductGroupSchema,
      AccessoryNoteSchema,
      PrintablePlaceSchema,
      GarmentAccessorySchema,
      GarmentAccessoryNoteSchema,
      SewingLineDeliverySchema,
      CuttingGroupSchema
    ])

    await this.sequelize
      .authenticate()
      .then(() => logging.info(PATH, 'Connection has been established successfully. 👏'))
      .catch((error) => logging.error(PATH, `Unable to connect to the database: ${error}`))
  }

  async closeConnection() {
    if (this.sequelize) {
      await this.sequelize
        .close()
        .then(() => logging.info(PATH, 'Connection has been closed'))
        .catch((error) => logging.error(PATH, `Unable to close the database: ${error}`))
    }
  }
}

export default new DBConnection()
