import productosSchema from '../schemas/productoSchema';
import mongoose from 'mongoose';
import { DAOInterface } from '../dao.interface';
import { ProductoDTO } from './producto.dto';

export class ProductosDAOMongo implements DAOInterface <ProductoDTO, string>{
    private prodModel;
    private static instance;
    constructor(){
        this.prodModel = productosSchema;
    }


    static getInstance(){
        if(!ProductosDAOMongo.instance){
            ProductosDAOMongo.instance = new ProductosDAOMongo();
        }
        return ProductosDAOMongo.instance;
    }

    async save(producto: ProductoDTO){
        try{
           const nuevo =  await this.prodModel.create(producto);
           return nuevo._id;
        }
        catch(err){
            throw new Error (`Ocurrio un error al guardar un nuevo producto ${err}`);
        }
    }
 
    async getById(id: string){
        try{
            if (id.match(/^[0-9a-fA-F]{24}$/)){
                const item = await this.prodModel.findOne({'_id': id});
                return item;
            }
            else{
                console.log('id no valido');
            }

        }
        catch (err){
            throw new Error(`Ocurrio un error al buscar un producto por ID ${err}`);
        }
    }

    async getAll(){
        try{
            const items = await this.prodModel.find();
            return items;
        }
        catch(err){
            throw new Error(`Ocurrio un error al traer todos los productos del inventario ${err}`)
        }
        
    }
    
    async deleteById(id: string){
        try{
            const result = await this.prodModel.deleteOne({'_id': id});
            return result; 
        }
        catch (err){
            throw new Error(`Error al borrar producto por ID ${err}`);
        }
    }

    async deleteAll(){
        try{
            const result = await this.prodModel.deleteMany();
            return result;
        }
        catch (err){
            throw new Error(`Error al eliminar todos los productos del catalogo ${err}`);
        }
    }

    async updateById(producto: ProductoDTO, id: string){
        try{
            if(await this.getById(id) != null){
                return await this.prodModel.updateOne(
                    {'_id': id},
                    {$set: producto}
                );
            }
            else{
                return({"error": "Producto a actualizar no existe, o ID es invalido"})
            }


        }
        catch (err){
            throw new Error(`Error al actualizar producto por ID ${err}`);
        }
    }

    async getByCategory(categoria: string){
        try{
            return await this.prodModel.find({'categoria': categoria});
        }
        catch(err){
            throw new Error(`Error en getByCategory productosDao ${err}`);
        }
    }

}

