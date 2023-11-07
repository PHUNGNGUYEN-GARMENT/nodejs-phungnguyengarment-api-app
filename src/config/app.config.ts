import dotenv from 'dotenv'
dotenv.config()

const appConfig = {
  port: parseInt(process.env.PORT ?? '8001')
}

export default appConfig
