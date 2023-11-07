import express, { Application } from 'express'
import AppServer from './src/app'
import appConfig from './src/config/app.config'

const app: Application = express()
const appServer: AppServer = new AppServer()

appServer.initialize(app)

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
