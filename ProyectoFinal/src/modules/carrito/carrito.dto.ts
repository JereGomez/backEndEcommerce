import { ProductoDTO } from "../producto/producto.dto";
export interface CarritoDTO{
    productos: Array<ProductoDTO>;
    email: string;
    direccionEntrega: string;
}