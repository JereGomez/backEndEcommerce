import path from 'path';
const __dirname = path.resolve();
import express from 'express';
import passport from 'passport';
import {apiProd} from "./src/routers/apiProd.js";
import {apiCarr} from "./src/routers/apiCarr.js";
import {apiUser} from './src/routers/apiUser.js';
import {mainApi} from './src/routers/mainApi.js';
import {apiOrden} from './src/routers/apiOrdenes.js';
import connect from './src/utils/dbConnect.js';
import errorHandler from './src/utils/errorHandler.js';
const app = express();
connect(app);


//Utilizar json en las request
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));//utilizamos la carperta public para acceder al index
app.use('', mainApi);
app.use('/api/user' , apiUser);
app.use('/api/productos' , apiProd ); //localHost:8080/api/productos , a partir de esa direccion se usa el router apiProd
app.use('/api/carrito' , apiCarr ); //localHost:8080/api/carrito , a partir de esa direccion se usa el router apiCarr
app.use('/api/ordenes' , apiOrden);
app.use(errorHandler);







const PORT = process.env.PORT || 8080;
app.listen(PORT , ()=>{
    console.log(`Listening on ${PORT}`);
});










