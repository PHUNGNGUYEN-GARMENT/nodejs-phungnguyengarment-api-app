import cors, { CorsOptions } from 'cors'
import express, { Application } from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import passport from 'passport'
import applyPassportStrategy from '~/config/passport.config'
import { responseEnhancer } from '~/middleware/express-formatter/index'
import dbConnection from './api/models'
import AppRoutes from './api/routes'

export default class App {
  constructor() {}

  public initialize(app: Application) {
    this.config(app)
    this.syncDatabase()
    // New app routes
    new AppRoutes(app, passport)
  }

  private config(app: Application) {
    const corsOptions: CorsOptions = {
      origin: '*'
    }
    applyPassportStrategy(passport)
    // Accept json body request
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    // (helmet) helps secure Express apps by setting HTTP response headers.
    app.use(helmet())
    app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }))
    // (morgan) HTTP request logger middleware for node.js
    app.use(morgan('dev'))
    // (cors) Provide some options Headers for accept others localhost to allow request
    app.use(cors(corsOptions))
    // Handle custom formatter response express (middleware)
    app.use(responseEnhancer())

    app.use(passport.initialize())
  }

  private syncDatabase() {
    dbConnection.sequelize?.sync()
  }
}
