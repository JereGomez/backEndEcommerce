import dotenv from 'dotenv';

dotenv.config();
const config = {
    dbType: process.env.DB_TYPE, 
    dbUser: process.env.DB_USER,
    dbPssword: process.env.DB_PASSWORD,
    uriString: process.env.DB_URI_STRING,
    claveSecreta: process.env.SECRET_KEY,
    myPhone: process.env.MY_PHONE,
    twilioSID:process.env.TWILIO_SID,
    twilioTOKEN: process.env.TWILIO_TOKEN,
    twilioPHONE: process.env.TWILIO_PHONE,
    adminEmail: process.env.ADMIN_EMAIL,
    mailPassword: process.env.MAIL_PASSWORD
}
export default config