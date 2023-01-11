import carritoSchema from '../schemas/carritoSchema';
import productosSchema from '../schemas/productoSchema';
import { DAOInterface } from '../dao.interface';
import { CarritoDTO } from './carrito.dto';


export class CarritosDAOMongo implements DAOInterface<CarritoDTO, number>{
    private carrModel;
    private static instance;

    private constructor(){
        this.carrModel = carritoSchema;
    }


    static getInstance(){
        if(!CarritosDAOMongo.instance){
            CarritosDAOMongo.instance = new CarritosDAOMongo();
        }
        return CarritosDAOMongo.instance;
    }

    async save(obj: CarritoDTO){
        try{
            const nuevo =  await this.carrModel.create(obj);
            return nuevo._id;
        }
        catch(err){
            throw new Error (`Ocurrio un error al crear nuevo carrito ${err}`);
        }
    }
 
    async getById(id: number){
        try{
            const item = await this.carrModel.findOne({'_id': id});
            return item;
        }
        catch (err){
            throw new Error(`Ocurrio un error al buscar un carrito por ID ${err}`);
        }
    }

    async getAll(id: number){
        try{
            const item = await this.carrModel.findOne({'_id': id});
            const items = item.productos
            return items;
        }
        catch(err){
            throw new Error(`Ocurrio un error al traer todos los productos del carrito deseado ${err}`)
        }
        
    }
    
    async deleteById(id: number){
        try{
            const result = await this.carrModel.deleteOne({'_id': id});
            return result; 
        }
        catch (err){
            throw new Error(`Error al borrar producto por ID ${err}`);
        }
    }

    async deleteAll(){
        try{
            const result = await this.carrModel.deleteMany();
            return result;
        }
        catch (err){
            throw new Error(`Error al eliminar todos los carritos ${err}`);
        }
    }

    async updateById(obj: CarritoDTO, id: number){
        try{
            await this.carrModel.updateOne(
                {'_id':id},
                {$set: obj}
            );
        }
        catch (err){
            throw new Error(`Error al actualizar producto por ID ${err}`);
        }
    }
    
    async deleteProd(carritoID: number , productoID: number){
        try{
            const carrito = await this.carrModel.findOne({'_id': carritoID});
            let productosAux = carrito.productos; //obtengo productos

            for(let i = 0; i<= (carrito.productos).length-1 ; i++){
                if((carrito.productos)[i]._id == productoID){
                    carrito.productos.splice(i,1);
                    break
                }
            }

            await this.updateById(carrito, carritoID)
            //await this.carrModel.updateOne({'_id': idCarr} , {$set: {productos: productos}});
        }
        catch(err){
            throw new Error(`Error al elminiar producto de carrito ${err}`);
        }
    }

    async addProd(carritoID: number , productoID: number){
        try{
            const carrito = await this.carrModel.findOne({'_id': carritoID});
            const productos = carrito.productos;
            let prodAgregar = await productosSchema.findOne({'_id': productoID});
            productos.push(prodAgregar);
            //await this.updateById(carrito, carritoID)
            await this.carrModel.updateOne({'_id': carritoID} , {$set: {productos: productos}});
            
        }
        catch(err){
            throw new Error(`Error al agregar un producto al carrito ${err}`);
        }
    }

}

