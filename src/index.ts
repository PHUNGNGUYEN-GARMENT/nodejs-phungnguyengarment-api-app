import cors, { CorsOptions } from 'cors'
import express, { Application } from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import { responseEnhancer } from '~/middleware/express-formatter/index'
import dbConnection from './api/models'
import appConfig from './config/app.config'

const app: Application = express()

const corsOptions: CorsOptions = {
  origin: '*'
}
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

// sync database
dbConnection.sequelize?.sync()

app
  .listen(appConfig.port, 'localhost', function () {
    console.log(`Server is running on port: ${appConfig.port} :: http://localhost:${appConfig.port}`)
  })
  .on('error', (err: any) => {
    if (err.code === 'EADDRINUSE') {
      console.log('Error: address already in use')
    } else {
      console.log(err)
    }
  })
