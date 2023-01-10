import path from 'path';
const __dirname = path.resolve();
import {DAOS} from '../modules/factory.ts'
const ProductosDAO  = DAOS.getProductosDAO();

async function getAll(req,res){
    try{
        const productos =  await ProductosDAO.getAll();
        res.send({productos: productos})
    }
    catch(err){
        next({mensaje: "ocurrio un error en getAll productos controller", error: err});
    }
}


async function getById(req ,res){
    try{
        const id = req.params.id;
        if(await ProductosDAO.getById(id) == null){
            res.send({error: `Producto con id:${id} no encontrado`});
        }
        else{
            res.send(await ProductosDAO.getById(id));

    }
    }
    catch(err){
        next({mensaje: "ocurrio un error en getById productos controller", error: err});
    }
    
}

async function nuevoProd(req, res){
    try{
        const {title, price, thumbnail} = req.body;
        if(title, price, thumbnail && req.session.user.admin === true){
            const id = await ProductosDAO.save(req.body);

            res.send({nuevoID: id});
        }
        else{
            res.send({Error: "Complete todos los campos requeridos"});
        }
    }
    catch(err){
        next({mensaje: "ocurrio un error en nuevoProd productos controller", error: err});
    }
}

async function actualizarProd(req, res){
    try{
        if(req.session.user.admin === true){
            console.log('admin true y actualizo')
            const item = {...req.body};
            const id = req.params.id; 
            const nuevo = await ProductosDAO.updateById(item, id);
            res.send(nuevo); 
        }
        else{
            res.send({error:" -2, descripcion: ruta 'http://localhost:8080/api/productos/:id' método 'PUT' no autorizada"})
        }
    }
    catch(err){
        next({mensaje: "ocurrio un error en actualizarProd productos controller", error: err});
    }
}

async function eliminarProd(req, res){
    try{ 
        if(req.session.user.admin === true){    
            const id = req.params.id;
            await ProductosDAO.deleteById(id);
        }
        else{
            res.send({error:" -1, descripcion: ruta 'http://localhost:8080/api/productos/:id' método 'DELETE' no autorizada"})
        }
    }
    catch(err){
        next({mensaje: "ocurrio un error en eliminarProd productos controller", error: err});
    }
}

async function getByCategoria(req, res){
    try{
        const categoria = req.params.categoria;
        res.send({categoria: await ProductosDAO.getByCategory(categoria)});
    }
    catch(err){
        next({mensaje: "ocurrio un error en getByCategoria productos controller", error: err});
    }
}

export {
    getAll,
    getById,
    nuevoProd,
    actualizarProd,
    eliminarProd,
    getByCategoria
}