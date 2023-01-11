
import path from 'path';
const __dirname = path.resolve();
import {DAOS} from '../modules/factory.ts'
const OrdenesDAO  = DAOS.getOrdenesDAO();
const CarritosDAO = DAOS.getCarritosDAO();
import {mailToUser} from '../utils/email.js'

async function getAllOrders(req, res, next){
    try{
        const ordenes = await OrdenesDAO.getAll();
        res.send({ordenes})
    }
    catch(err){
        next({mensaje: "ocurrio un error en getAllOrders ordenes controller", error: err});
    }
}
async function getUserOrden(req, res, next){
    try{
        const user = req.session.user.username;
        const ordenes = await OrdenesDAO.getByUsername(user);
        res.status(200).send({user, ordenes});
    }
    catch(err){
        next({mensaje: "ocurrio un error en getUserOrden ordenes controller", error: err});
    }
}
async function getOrdenById(req, res, next){
    try{
        const id = req.params.id;
        const orden = await OrdenesDAO.getById(id);
        res.status(200).send({id , orden});
    }
    catch(err){
        next({mensaje: "ocurrio un error en getOrdenById ordenes controller", error: err});
    }
}
async function createOrden(req, res, next){
    try{
        const user = req.session.user;
        const carrito = await CarritosDAO.getAll(user.carrito)
        const ordenes = await OrdenesDAO.getAll();
        const orden = { items: ordenarProductos(carrito),
                        NumOrden: generarNumOrden(ordenes),
                        email: user.username,
                        direccion: user.direccion
                    }
        const nuevaOrden = await OrdenesDAO.save(orden);
        mailToUser({email: user.username, orden: nuevaOrden}, 'orden');
        res.status(201).json({nuevaOrden})
    }
    catch(err){
        next({mensaje: "ocurrio un error en createOrden ordenes controller", error: err});
    }
}
async function updateOrden(req, res, next){
    try{
        const items = req.body;
        const id = req.params.id;
        await OrdenesDAO.updateById(items , id);
        res.status(200).send({Acutalizada: `Oden con id ${id}actualizada`})
    }
    catch(err){
        next({mensaje: "ocurrio un error en updateOrden ordenes controller", error: err});
    }
}
async function deleteOrden(req, res, next){
    try{
        const id = req.params.id;
        await OrdenesDAO.deleteById(id);
        res.status(200).send({eliminada: `Orden con id ${req.params.id} eliminada`})
    }
    catch(err){
        next({mensaje: "ocurrio un error en deleteOrden ordenes controller", error: err});
    }
}

function ordenarProductos(productos){
    const items = {};
    productos.forEach(prod => {
        if(items[prod.title] == undefined){
            items[prod.title] = 1;
        }
        else{
            items[prod.title] +=1;
        }
    });
    return items;
};

function generarNumOrden(ordenes){
    let numAux = 1;
    if(ordenes.length > 0) {
        let disponible = false;
        while(disponible == false){
            let resultado = ordenes.filter((orden) => orden.NumOrden == numAux);
            if(resultado.length > 0){
                numAux+=1;
            }
            else{
                disponible = true;
            }
        }
    }
    return numAux;
}

export {
    getAllOrders,
    getUserOrden,
    getOrdenById,
    createOrden,
    updateOrden,
    deleteOrden
}