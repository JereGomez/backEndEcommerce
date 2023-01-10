import {Types} from 'mongoose';
export interface UsuarioDTO{
    username: string;
    password: string;
    nombre: string;
    edad: number;
    direccion: string;
    telefono: string;
    imagen?: string;
    carrito: Types.ObjectId;
    admin: boolean;
    _id: Types.ObjectId;
}