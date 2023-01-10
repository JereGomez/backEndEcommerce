import {ProductosDAOMongo} from '../modules/producto/producto.dao'
import {CarritosDAOMongo} from  '../modules/carrito/carrito.dao'
import {UsuariosDAOMongo} from '../modules/usuario/usuario.dao'
import { OrdenesDAOMongo } from '../modules/orden/orden.dao'
//import CarritosDaoFirebase from ''
//import ProductosDaoFirebase from '';
//import Contenedor from '';
//import ManejoCarr from ''
//import admin from 'firebase-admin';
//import serviceAccount from './pruebafire-abe04-firebase-adminsdk-1sbdf-2061ae155f.json' assert{type: "json"};
import config from '../config/config.js'
import { ProjectConfigManager } from 'firebase-admin/lib/auth/project-config-manager';

 class DAOFactory{
    private productosDAO;
    private carritosDAO;
    private usuariosDAO;
    private ordenesDAO
    
    constructor(){}

    getProductosDAO(){
        switch(config.dbType){
            case 'mongodb':
                this.productosDAO = ProductosDAOMongo.getInstance();
                break;
            case 'firebase':
                //falta
                break;
            case 'local':
                //falta
                break;
        }
        return this.productosDAO;
    }

    getCarritosDAO(){
        switch(config.dbType){
            case 'mongodb':
                this.carritosDAO = CarritosDAOMongo.getInstance();
                break;
            case 'firebase':
                //falta
                break;
            case 'local':
                //falta
                break;
        }
        return this.carritosDAO;
    }

    getUsuariosDAO(){
        switch(config.dbType){
            case 'mongodb':
                this.usuariosDAO = UsuariosDAOMongo.getInstance();
                break;
            case 'firebase':
                //falta
                break;
            case 'local':
                //falta
                break;
        }
        return this.usuariosDAO;
        
    }

    getOrdenesDAO(){
        switch(config.dbType){
            case 'mongodb':
                this.ordenesDAO = OrdenesDAOMongo.getInstance();
                break;
            case 'firebase':
                //falta
                break;
            case 'local':
                //falta
                break;
        }
        return this.ordenesDAO;
    }
}

export const DAOS =  new DAOFactory();



/*
switch(config.dbType){
    case 'mongodb':
        ProductosDao = new ProductosDaoMongo(productosSchema);
        CarritosDao = new CarritosDaoMongo(carritosSchema, ProductosDao);
        UsuariosDao = new UsuariosDaoMongo(usuariosSchema, CarritosDao);
        break;
    case 'firebase':
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        });
        const db = admin.firestore();
        console.log('conectado okk')

        ProductosDao = new ProductosDaoFirebase(db.collection('productos'));
        CarritosDao = new CarritosDaoFirebase(db.collection('carritos'), ProductosDao);
        break;
    case 'local':
        ProductosDao = new Contenedor('../../db/productos.json');
        CarritosDao = new  ManejoCarr('../../db/carritos.json');
}

export {ProductosDao , CarritosDao, UsuariosDao}
*/