//ROUTER PARA RUTA /api/productos
import express from 'express';
const {Router} = express //se importa la funcion router
const apiProd = Router();
import { authorization } from '../utils/middleware.js';
import errorHandler from '../utils/errorHandler.js';


import {actualizarProd,
    eliminarProd,
    getAll,
    getById,
    nuevoProd,
    getByCategoria  } from '../controllers/productos.js'

//GET
apiProd.get ('/' , getAll);
apiProd.get ('/:id', getById);
apiProd.get('/cat/:categoria', getByCategoria);
//POST
apiProd.post('' , authorization, nuevoProd);
//PUT
apiProd.put('/:id' , authorization, actualizarProd);
//DELETE
apiProd.delete('/:id' , authorization, eliminarProd);

apiProd.use(errorHandler)
export  {apiProd}