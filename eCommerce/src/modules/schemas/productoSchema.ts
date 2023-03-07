import mongoose from 'mongoose'; //importamos utilidades a utilizar de mongoose
import { ProductoDTO } from '../producto/producto.dto';
const {Schema , model} = mongoose;

const ProductosSchema = new Schema<ProductoDTO>({
    title: {type: String, require: true, maxLength: 100},
    price: {type: Number, require: true},
    thumbnail: {type: String},
    stock: {type: Number},
    //codigo: {type: String, require: true},
    descripcion: {type: String, maxLength: 255},
    categoria: {type: String}
}, {timestamps: true});

const productosSchema = model('productos' , ProductosSchema);
export default productosSchema