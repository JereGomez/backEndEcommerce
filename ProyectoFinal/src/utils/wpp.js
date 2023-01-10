import twilio from 'twilio';
import config from '../config/config.js'

const sid = config.twilioSID;
const token = config.twilioTOKEN;
const my_phone = config.myPhone;
const twilio_phone = config.twilioPHONE;

const client = twilio(sid,token);

const smsOptions= (to) => {
    return{
    from: my_phone, //quien envia el mensaje    
    to: to,   //quien recibe el mensaje
    body: 'Confirmacion de creacion de cuenta en Ecommerce!!'   //cuerpo del mensaje 
    }
}

async function sendMessage(user){
    try{
        const info = await client.messages.create(smsOptions(user.telefono));//funcion para enviar el mensaje, se pasa el objeto creado con las opciones del  mensaje
        console.log(info);
    }
    catch(err){
        throw new Error(`Error al enviar mensaje de confirmacion ${err}`);
    }
}

export {sendMessage}
 