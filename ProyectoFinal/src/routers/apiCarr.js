//ROUTER PARA api/carrito
import express from 'express';
const {Router} = express //se importa la funcion router
const apiCarr = Router();
import {carritoView , eliminarProd, vaciarCarrito, agrearAlCarrito, crearCarrito, eliminarCarritoCompleto, getAllProds} from '../controllers/carrito.js'
import { authorization } from '../utils/middleware.js';

//GET
apiCarr.get('/', carritoView )
apiCarr.get ('/productos', authorization, getAllProds); //traer productos de carrito especifico
//POST
apiCarr.post('/', crearCarrito);
apiCarr.post("/productos/:id_prod", agrearAlCarrito);
//PUT
//apiCarr.put('/:id' , actualizarCarrito);
apiCarr.put('/vaciar', vaciarCarrito)
//DELETE
apiCarr.delete('/:id' , eliminarCarritoCompleto);
apiCarr.delete("/productos/:id_prod", eliminarProd);

export  {apiCarr}