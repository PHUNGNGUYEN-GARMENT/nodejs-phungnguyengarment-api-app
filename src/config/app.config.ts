import 'dotenv/config'

const appConfig = {
  appURL: process.env.APP_URL,
  companyName: process.env.COMPANY_NAME,
  port: parseInt(process.env.PORT ?? '8001'),
  secretKey: process.env.SECRET_KEY ?? '',
  auth: {
    user: process.env.EMAIL_ADMIN,
    appPassword: process.env.APP_PASSWORD
  }
}

export default appConfig
