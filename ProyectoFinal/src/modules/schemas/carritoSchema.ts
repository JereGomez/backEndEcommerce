import mongoose from 'mongoose'; //importamos utilidades a utilizar de mongoose
import {ProductoDTO} from '../producto/producto.dto';
import { CarritoDTO } from '../carrito/carrito.dto.js';
const {Schema , model} = mongoose;

const CarritosSchema = new Schema<CarritoDTO>({
    productos:  Array<ProductoDTO>,//por defecto es un array vacio
    email: {type: String, require: true},
    direccionEntrega: {type: String, require: true}
}, {timestamps: true});

const carritosSchema = mongoose.model('carritos' , CarritosSchema);
export default carritosSchema