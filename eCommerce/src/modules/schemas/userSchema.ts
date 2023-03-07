import {Schema, model, Types} from 'mongoose'; //importamos utilidades a utilizar de mongoose
import { UsuarioDTO } from '../usuario/usuario.dto';

const UsersSchema = new Schema<UsuarioDTO>({
    username: {type: String, require: true},
    password: {type: String},
    nombre: {type: String, require: true, maxLength: 100},
    edad: {type: Number, require: true},
    direccion: {type: String},
    //codigo: {type: String, require: true},
    telefono: {type: String, maxLength: 255},
    imagen: {type: String},
    carrito: Types.ObjectId,
    admin: {type: Boolean, default: false}
}, {timestamps: true});

const usuariosSchema = model('usuarios' , UsersSchema);
export default  usuariosSchema