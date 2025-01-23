require('dotenv').config({path:`../.env`});
const twilio = require('twilio');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const verifySid = process.env.TWILIO_VERIFY_SERVICE_SID;

const twilioClient = twilio(accountSid, authToken);

module.exports = { twilioClient, verifySid };