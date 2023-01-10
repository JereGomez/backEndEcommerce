import nodemailer from 'nodemailer';
import config from '../config/config.js'

const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: config.adminEmail,
        pass: config.mailPassword //pasar a ENV!!!!!!
    }
});

const ToUser  = (data, subject) => {
    if(subject === 'confirmacion'){
        return { 
            to: data.email,
            subject: 'Email confirmacion Ecommerce',
            html: `<h1> Este es el Email de confirmacion, tu cuenta fue creada exitosamente!! </h1>`,
        }
    }
    else if(subject === 'orden'){
        let prods = []
        let items = data.orden.items
        Object.keys(items).forEach(item => {
            prods.push(`${item} x ${items[item]}`)
        })
        return { 
            to: data.email,
            subject: 'Orden generada correctamente',
            html: `<h1> Tu orden fue generada de manera correcta, gracias por confiar en nosotros!! </h1>
            <p>Numero de Orden: ${data.orden.NumOrden}</p>
            <p>Estado: ${data.orden.estado}</p>
            <p>Email: ${data.orden.email}</p>
            <p>Direccion Entrega: ${data.orden.direccion}</p>
            <p>Items: ${prods}</p>`,
            //attachments: [] //attachments es para incluir archivos o elementos adjuntos de nuestro pc o urls en el mail, cada elemento es un objeto => {path: './....'}
        }
    }

};

const ToAdmin = (user)=>{
    return {
    to: config.adminEmail,
    subject: 'Nuevo usuario registrado en Ecommerce',
    html: `<h1>Nuevo Usuario</h1>
            <p>Username: ${user.username}</p>
            <p>Nombre: ${user.nombre}</p>
            <p>Edad: ${user.edad}</p>
            <p>Direccion: ${user.direccion}</p>
            <p>Telefono: ${user.telefono}</p>`
    }

}

async function mailToAdmin(user){
    try{
        const toAdmin = await transporter.sendMail(ToAdmin(user));
    }
    catch(err){
        throw new Error(`Error al enviar Email de confirmacion a ADMIN ${err}`);
    }
};

async function mailToUser(data, subject){
    try{
        const toUser = await transporter.sendMail(ToUser(data, subject));
    }
    catch(err){
        throw new Error(`Error al enviar Email de confirmacion/orden a USUARIO ${err}`);
    }
};


export {mailToAdmin, mailToUser}