import { ProductoDTO } from "../producto/producto.dto";

interface OrdenDTO{
    items: Object;
    NumOrden: number;
    estado: string;
    email: string;
    direccion: string
}

export {
    OrdenDTO
}