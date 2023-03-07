import path from 'path';
const __dirname = path.resolve();
import {DAOS} from '../modules/factory.ts';
const CarritosDAO = DAOS.getCarritosDAO();
const UsuariosDao = DAOS.getUsuariosDAO();

async function getAllProds(req, res, next){
    try{
        const carr = req.session.user.carrito
        const productos = await CarritosDAO.getAll(carr);
        res.send({productos});
    }
    catch(err){
        next({mensaje: "ocurrio un error en getAllProds carrito controller", error: err});
    }
}

async function crearCarrito(username, direccion, req, res, next){
    try{
        const carrito = {
            prouctos: [],
            email: username,
            direccionEntrega: direccion
        }
        const id = await CarritosDAO.save(carrito);
        return id
    }
    catch(err){
         next({mensaje: "ocurrio un error en save carrito controller", error: err});
    }
}

async function agrearAlCarrito(req, res, next){
    try{
        const carr = await UsuariosDao.getCarId(req.session.user);
        await CarritosDAO.addProd(carr , req.params.id_prod) //pasamos id del carrito y id del producto
        res.send({agregado:`Producto con id ${req.params.id_prod} agregado`});
    }
    catch(err){
                next({mensaje: "ocurrio un error en agergarAlCarrito carrito controller", error: err});
    }
}

async function eliminarCarritoCompleto(req, res, next){
    try{
        await CarritosDAO.deleteById(req.params.id);
    }
    catch(err){
                next({mensaje: "ocurrio un error en eliminarCarritoCompleto carrito controller", error: err});
    }
}

async function eliminarProd(req, res, next){
    try{

        const carr = await UsuariosDao.getCarId(req.session.user);
        await CarritosDAO.deleteProd(carr , req.params.id_prod);
        res.send({eliminado: `Producto con el id ${req.params.id_prod} eliminado`})

    }
    catch(err){
                next({mensaje: "ocurrio un error en eliminarProd carrito controller", error: err});
    }
}

async function vaciarCarrito(req, res, next){
    try{
        const idCarr = await UsuariosDao.getCarId(req.session.user);
        const carr = {productos: []}
        await CarritosDAO.updateById(carr , idCarr);
        res.send({Vaciado: `Carrito con el id ${id} vaciado`})
    }
    catch(err){
                next({mensaje: "ocurrio un error en vaciarCarrito carrito controller", error: err});
    }
}



export {
    getAllProds,
    crearCarrito,
    agrearAlCarrito,
    eliminarCarritoCompleto,
    eliminarProd,
    vaciarCarrito
}