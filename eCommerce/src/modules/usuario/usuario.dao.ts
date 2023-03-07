import usuarioSchema from '../schemas/userSchema';
import { DAOInterface } from '../dao.interface';
import { UsuarioDTO } from './usuario.dto';

export class UsuariosDAOMongo implements DAOInterface <UsuarioDTO, number>{
    private userModel;
    private static instance;
    constructor(){
        this.userModel = usuarioSchema;
    }

    static getInstance(){
        if(!UsuariosDAOMongo.instance){
            UsuariosDAOMongo.instance = new UsuariosDAOMongo();
        }
        return UsuariosDAOMongo.instance;
    }

    async save(usuario: UsuarioDTO){ //tiene que venir con el carrito creado
        try{
            const nuevo =  await this.userModel.create(usuario);
            return nuevo;
        }
        catch(err){
            throw new Error (`Ocurrio un error al crear un nuevo usuario ${err}`);
        }
    }
 
    async getById(id: number){
        try{
            const item = await this.userModel.findOne({'_id': id});
            return item;
        }
        catch (err){
            throw new Error(`Ocurrio un error al buscar usuario por ID ${err}`);
        }
    }

    async getAll(){
        try{
            const items = await this.userModel.find();
            return items;
        }
        catch(err){
            throw new Error(`Ocurrio un error al traer todos los usuarios ${err}`)
        }
        
    }
    
    async deleteById(id: number){
        try{
            const result = await this.userModel.deleteOne({'_id': id});
            return result; 
        }
        catch (err){
            throw new Error(`Error al borrar usuario por ID ${err}`);
        }
    }

    async deleteAll(){
        try{
            const result = await this.userModel.deleteMany();
            return result;
        }
        catch (err){
            throw new Error(`Error al eliminar todos los usuarios ${err}`);
        }
    }

    async updateById(usuario: UsuarioDTO, id: number){
        try{
            await this.userModel.updateOne(
                {'_id':id},
                {$set: usuario}
            );
        }
        catch (err){
            throw new Error(`Error al actualizar usuario por ID ${err}`);
        }
    }

    async getCarId(id: number){
        const carr = await this.userModel.findOne({'_id': id});
        return carr.carrito;
    }
    
    async getByUsername(username: string){
        try{
        return await this.userModel.findOne({username});
        }
        catch(err){
            throw new Error(`Error al buscar  usuario por username ${err}`);
        }
    }

}

