//ROUTER PARA api/carrito
import express from 'express';
const {Router} = express //se importa la funcion router
const apiCarr = Router();
import { eliminarProd, vaciarCarrito, agrearAlCarrito, crearCarrito, eliminarCarritoCompleto, getAllProds} from '../controllers/carrito.js'
import { authorization } from '../utils/middleware.js';
import errorHandler from '../utils/errorHandler.js';


//GET
apiCarr.get ('/productos', authorization, getAllProds); //traer productos de carrito especifico
//POST
//apiCarr.post('/', crearCarrito);
apiCarr.post("/productos/:id_prod", agrearAlCarrito);
//PUT
//apiCarr.put('/:id' , actualizarCarrito);
apiCarr.put('/vaciar', vaciarCarrito)
//DELETE
apiCarr.delete('/:id' , eliminarCarritoCompleto);
apiCarr.delete("/productos/:id_prod", eliminarProd);
apiCarr.use(errorHandler)
export  {apiCarr}