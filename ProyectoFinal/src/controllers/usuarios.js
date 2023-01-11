import path from 'path';
const __dirname = path.resolve();
import {DAOS} from '../modules/factory.ts';
const UsuariosDAO = DAOS.getUsuariosDAO();
import { crearCarrito } from './carrito.js';
import {hashPassword , comparePassword} from "../utils/hash.js"
import {mailToAdmin, mailToUser} from '../utils/email.js'
import jwt from 'jsonwebtoken';
import config from '../config/config.js';


async function signup(req, username, password, done){
    try{
        const auxUser = await UsuariosDAO.getByUsername(username);
        if (auxUser) {
            done(new Error(`User already exists`), null)
        }
        let { nombre, edad, direccion, telefono, imagen} = req.body;

        if(password === req.body.passCheck){
            if(username, password, nombre, edad, direccion, telefono, imagen){
                const user = {username, nombre, password, edad, direccion, telefono, imagen};
                user.password = hashPassword(password);
                user.carrito = await crearCarrito(username, direccion);
                const newUser = await UsuariosDAO.save(user);
                await mailToAdmin(newUser);
                await mailToUser({email: username}, "confirmacion");
                return done(null, newUser);
            }
            done(new Error(`Missing nignup data`), null)
        }
        done(new Error(`Password fields dont match`), null)
        }
    catch(err){
        done(new Error(`Error en signup ${err}`), null)
    }
}



async function login( username, password, done){
    try{
        const user = await UsuariosDAO.getByUsername(username);
        const passHash = user.password;
        if (!user || !comparePassword(password, passHash)) {
            done(new Error(`invalid username or password`), null)
        }
        return done(null, user);
    }
    catch(err){
        done(new Error(`Error en login ${err}`, null))
    }
}

async function postSignup(req, res, done){
    try{
        req.session.user = req.user;
        res.send({UsuarioCreado: req.user});
    }
    catch(err){
        done(new Error(`Error en postSignup ${err}`, null))
    }
}

async function postLogin(req, res, done){
    try{
        //GENERAR Y ENVIAR JWT TOKEN PARA AUTENTICACION DE RUTAS LUEGO DEL LOG IN
        const user = req.body.username;
        const token = jwt.sign({user}, config.claveSecreta)
        req.session.user = req.user;
        res.send({token});
    }
    catch(err){
        done(new Error(`Error en postLogin ${err}`, null))
    }
}

async function logout(req, res, done){
    try{
        req.session.destroy( (err)=>{
            if (err)   res.redirect('/')
        });
        req.logout(()=>{
            res.send('User logged out')
        })

    }
    catch(err){
        done(new Error(`Error en logout ${err}`, null))
    }
}

export {
    signup,
    login,
    postSignup,
    postLogin,
    logout
}