import cors, { CorsOptions } from 'cors'
import express, { Application } from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import passport from 'passport'
import applyPassportStrategy from '~/middleware/auth/passport.middleware'
import { responseEnhancer } from '~/middleware/express-formatter/index'
import AppRoutes from '~/routes/index'
import DBConnection from './api/models'

class App {
  constructor() {}

  public initialize(app: Application) {
    this.config(app)
    this.syncDatabase()
    new AppRoutes(app)
  }

  private config(app: Application) {
    const corsOptions: CorsOptions = {
      origin: 'http://localhost:8001'
    }
    applyPassportStrategy(passport)
    app.use(passport.initialize())
    // Accept json body request
    app.use(express.json())
    app.use(express.urlencoded({ extended: false }))
    // (helmet) helps secure Express apps by setting HTTP response headers.
    app.use(helmet())
    app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }))
    // (morgan) HTTP request logger middleware for node.js
    app.use(morgan('dev'))
    // (cors) Provide some options Headers for accept others localhost to allow request
    app.use(cors(corsOptions))
    // Handle custom formatter response express (middleware)
    app.use(responseEnhancer())
  }

  private syncDatabase() {
    const dbConnection = new DBConnection()
    dbConnection.sequelize?.sync()
  }
}

export default App
