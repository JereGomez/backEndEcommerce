import path from 'path';
const __dirname = path.resolve();
import {DAOS} from '../modules/factory.ts';
const UsuariosDAO = DAOS.getUsuariosDAO();
import { crearCarrito } from './carrito.js';
import {hashPassword , comparePassword} from "../utils/hash.js"
import {mailToAdmin, mailToUser} from '../utils/email.js'
import jwt from 'jsonwebtoken';
import config from '../config/config.js';
import { networkInterfaces } from 'os';


async function signup(req, username, password, next){
    try{
        const auxUser = await UsuariosDAO.getByUsername(username);
        if (auxUser) {
            next({mensaje: `error en signup usuarios controller`, error: "User Already exists"})
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
            next({mensaje: `error en signup usuarios controller`, error: "Missing signup data."})
        }
        next({mensaje: `error en signup usuarios controller`, error: "Password fields dont match"})
        }
    catch(err){
        next({mensaje: `error en signup usuarios controller`, error: err})
    }
}



async function login( username, password, done){
    try{
        const user = await UsuariosDAO.getByUsername(username);
        const passHash = user.password;
        if (!user || !comparePassword(password, passHash)) {
            next({mensaje: `error en login usuarios controller`, error: "Invalid username or password"})
        }
        return done(null, user);

    }
    catch(err){
        next({mensaje: "ocurrio un error en login usuarios controller", error: err});
    }
}

async function postSignup(req, res, next){
    try{
        req.session.user = req.user;
        res.redirect("/api/user/login");
    }
    catch(err){
        next({mensaje: "ocurrio un error en postSignup usuarios controller", error: err});
    }
}

async function postLogin(req, res, next){
    try{
        //GENERAR Y ENVIAR JWT TOKEN PARA AUTENTICACION DE RUTAS LUEGO DEL LOG IN
        const user = req.body.username;
        const token = jwt.sign({user}, config.claveSecreta)
        req.session.user = req.user;
        res.send({token});
    }
    catch(err){
        next({mensaje: "ocurrio un error en postLogin usuarios controller", error: err});
    }
}

async function logout(req, res, next){
    try{
        req.session.destroy( (err)=>{
            if (err)   res.redirect('/')
        });
        req.logout(()=>{
            res.redirect('/api/user/login')
        })

    }
    catch(err){
        next({mensaje: "ocurrio un error en logout usuarios controller", error: err});
    }
}

export {
    signup,
    login,
    postSignup,
    postLogin,
    logout
}