export interface DAOInterface<Obj, ObjID>{
    save(object?: Obj);
    getById(id: ObjID);
    getAll(id?: ObjID); 
    deleteById(id: ObjID);
    deleteAll(id?: ObjID); 
    updateById(object: Obj, id: ObjID);
}