import mongoose from 'mongoose'; //importamos utilidades a utilizar de mongoose
import {OrdenDTO} from '../orden/orden.dto';
const {Schema , model} = mongoose;

const OrdenSchema = new Schema<OrdenDTO>({
    items: {type: Object, require:true},
    NumOrden: {type: Number, require: true},
    estado: {type: String, require: true, default: 'generada'},
    email: {type: String, require: true},
    direccion: {type: String}
   
}, {timestamps: true});

const ordenSchema = mongoose.model('ordenes' , OrdenSchema);
export default ordenSchema