import { Sequelize } from 'sequelize-typescript'
import configuration from '~/config/database.config'
import logging from '~/utils/logging'
import UserSchema from './user.model'

const NAMESPACE = 'model/index'

const { database, host, username, password } = configuration.development

class DBConnection {
  public sequelize: Sequelize | undefined

  constructor() {
    this.createConnection()
  }

  private async createConnection() {
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
      },
      models: [UserSchema]
    })

    await this.sequelize
      .authenticate()
      .then(() => logging.info(NAMESPACE, 'Connection has been established successfully. 👏'))
      .catch((error) => logging.error(NAMESPACE, `Unable to connect to the database: ${error}`))
  }

  private async closeConnection() {
    if (this.sequelize) {
      await this.sequelize
        .close()
        .then(() => logging.info(NAMESPACE, 'Connection has been closed'))
        .catch((error) => logging.error(NAMESPACE, `Unable to close the database: ${error}`))
    }
  }
}

export default DBConnection
