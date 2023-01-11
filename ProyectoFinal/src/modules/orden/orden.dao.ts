import ordenSchema from "../schemas/ordernSchema";
import { DAOInterface } from "../dao.interface";
import { OrdenDTO } from "./orden.dto";

export class OrdenesDAOMongo implements DAOInterface <OrdenDTO , string> {
    private ordenModel;
    private static instance;

    private constructor(){
        this.ordenModel = ordenSchema;
    }


    static getInstance(){
        if(!OrdenesDAOMongo.instance){
            OrdenesDAOMongo.instance = new OrdenesDAOMongo();
        }
        return OrdenesDAOMongo.instance;
    }

    async save(orden?: OrdenDTO | undefined) {
        try{
            const nuevaOrden = await this.ordenModel.create(orden)
            return nuevaOrden;
        }
        catch(err){
            throw new Error(`Error en save OrdenDAO ${err}`);
        }
        
    }
    async getById(id: string | undefined) {
        try{
            const orden = await this.ordenModel.findOne({'_id': id})
            return orden;
        }
        catch(err){
            throw new Error(`Error al bucsar por id Ordenes ${err}`)
        }
    }
    async getAll(id?: string | undefined) {
        try{
            return await this.ordenModel.find();
        }
        catch(err){
        
        }
    }
    async deleteById(id: string) {
        try{
            return await this.ordenModel.deleteOne({'_id': id});
        }
        catch(err){
            
        }
    }
    async deleteAll(id?: string | undefined) {
        try{
            return await this.ordenModel.deleteMany();
        }
        catch(err){

        }
    }
    async updateById(orden: OrdenDTO, id: string) {
        try{
            await this.ordenModel.updateOne(
                {'_id':id},
                {$set: orden}
            )
        }
        catch(err){
        
        }
    }

    async getByUsername(username: string){
        try{
            return await this.ordenModel.findOne({'email': username});
        }
        catch(err){
            throw new Error(`Error al buscar  orden por username ${err}`);
        }
    }

}