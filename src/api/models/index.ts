import { Sequelize } from 'sequelize-typescript'
import configuration from '~/config/database.config'
import logging from '~/utils/logging'
import ColorSchema from './color.model'
import GarmentAccessoryNoteSchema from './garment-accessory-note.model'
import GroupSchema from './group.model'
import ImportationSchema from './importation.model'
import ImportedLotSchema from './imported-lot.model'
import NotionAccessorySchema from './notion-accessory.model'
import ProductColorSchema from './product-color.model'
import ProductGroupSchema from './product-group.model'
import ProductSchema from './product.model'
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
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
    })

    this.sequelize?.addModels([
      UserSchema,
      ProductSchema,
      ImportedLotSchema,
      ImportationSchema,
      ColorSchema,
      ProductColorSchema,
      GroupSchema,
      ProductGroupSchema,
      GarmentAccessoryNoteSchema,
      NotionAccessorySchema
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
