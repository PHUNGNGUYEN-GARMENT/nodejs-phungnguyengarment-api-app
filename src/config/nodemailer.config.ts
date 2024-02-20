import 'dotenv/config'
import nodemailer from 'nodemailer'
import Mail from 'nodemailer/lib/mailer'
import appConfig from './app.config'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  // host: 'smtp.gmail.com',
  // port: 465,
  // secure: true,
  auth: {
    user: appConfig.auth.user, // Sender email address
    pass: appConfig.auth.appPassword // App password from gmail account
  }
})

const mailOptions = (sendToEmails: string[] | string, otpCode: string): Mail.Options => {
  return {
    from: {
      name: appConfig.companyName ?? 'PHUNG NGUYEN GARMENT',
      address: appConfig.auth.user ?? ''
    },
    to: sendToEmails,
    subject: 'OTP for Authentication',
    html: `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>OTP Verification Email</title>
    </head>
    <body>
        <div style="background-color: #f4f4f4; padding: 20px;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 5px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); padding: 20px;">
                <h2 style="text-align: center; color: #007bff;">OTP Verification</h2>
                <p>Dear user,</p>
                <p>Your OTP (One-Time Password) for verification is: <h3><strong>${otpCode}</strong></h3></p>
                <p>Please use this OTP to verify your email address.</p>
                <p>If you didn't request this, you can safely ignore this email.</p>
                <p>Thank you,</p>
                <p>Phung Nguyen Garment</p>
            </div>
        </div>
    </body>
    </html>
    `
  }
}

export { mailOptions, transporter }
