import path from 'path';
const __dirname = path.resolve();
import {DAOS} from '../modules/factory.ts';
const UsuariosDAO = DAOS.getUsuariosDAO();
const CarritosDAO = DAOS.getCarritosDAO();
import {hashPassword , comparePassword} from "../utils/hash.js"
import {mailToAdmin, mailToUser} from '../utils/email.js'
import jwt from 'jsonwebtoken';
import config from '../config/config.js';


async function signup(req, username, password, done){
    try{
        const auxUser = await UsuariosDAO.getByUsername(username);
        if (auxUser) {
            return done(new Error("User already exists."), null);
        }
        let { nombre, edad, direccion, telefono, imagen} = req.body;

        if(password === req.body.passCheck){
            if(username, password, nombre, edad, direccion, telefono, imagen){
                const user = {username, nombre, password, edad, direccion, telefono, imagen};
                user.password = hashPassword(password);
                user.carrito = await CarritosDAO.save();
                const newUser = await UsuariosDAO.save(user);
                await mailToAdmin(newUser);
                await mailToUser({email: username}, "confirmacion");
                return done(null, newUser);
            }
            return done(new Error("Missing signup data."), null)
        }
        return done(new Error("Password fields dont match"), null);
        }
    catch(err){
        next({mensaje: "ocurrio un error en signup usuarios controller", error: err});
    }
}



async function login( username, password, done){
    try{
        const user = await UsuariosDAO.getByUsername(username);
        const passHash = user.password;
        if (!user || !comparePassword(password, passHash)) {
            return done(null, null, { message: "Invalid username or password" });
        }
        return done(null, user);

    }
    catch(err){
        next({mensaje: "ocurrio un error en login usuarios controller", error: err});
    }
}

async function postSignup(req, res){
    try{
        req.session.user = req.user;
        res.redirect("/api/user/login");
    }
    catch(err){
        next({mensaje: "ocurrio un error en postSignup usuarios controller", error: err});
    }
}

async function postLogin(req, res){
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

async function logout(req, res){
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