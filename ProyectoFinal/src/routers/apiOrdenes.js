//ROUTER PARA RUTA /api/ordenes
import express from 'express';
const {Router} = express //se importa la funcion router
const apiOrden = Router();
import { authorization } from '../utils/middleware.js';
import {getAllOrders,
    getUserOrden,
    getOrdenById,
    createOrden,
    updateOrden,
    deleteOrden } from '../controllers/ordenes.js'

//GET
apiOrden.get('', authorization, getAllOrders);
apiOrden.get('/user', authorization, getUserOrden);
apiOrden.get('/:id', authorization, getOrdenById);
//POST
apiOrden.post('', authorization, createOrden);
//PUT
apiOrden.put('/:id', authorization, updateOrden);
//DELETE
apiOrden.delete('/:id', authorization, deleteOrden);

export  {apiOrden}