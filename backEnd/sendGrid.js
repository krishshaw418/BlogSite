const sgMail = require('@sendgrid/mail')
require('dotenv').config({path:`../.env`})
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
const msg = {
  to: 'amankumarshaw418@gmail.com', // Change to your recipient
  from: 'shawkrish418@gmail.com', // Change to your verified sender
  subject: 'Sending with SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
}
sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent')
  })
  .catch((error) => {
    console.error(error)
  })