import MongoStore from 'connect-mongo';
import session from 'express-session';
import mongoose from 'mongoose';
import config from '../config/config.js'

async function connect(app){
    try{
        
        mongoose.connect(config.uriString);

        await app.use(session({ //Base de datos Mongo
                secret: config.claveSecreta, 
                resave: false,
                saveUninitialized: true,
                store: MongoStore.create({ 
                    mongoUrl: config.uriString,
                    //mongoOptions, 
                    retries: 0,
                    ttl: 60 * 60 * 24
                })
            }));
        console.log(mongoose.connection.readyState);
    }

    catch(err){
        throw(new Error(`Error al conectarse a la base de datos ${err}`))
    }
}

export default connect;