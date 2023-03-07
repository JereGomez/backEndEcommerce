import express from 'express';
const {Router} = express //se importa la funcion router
const mainApi = Router();
import { authorization } from '../utils/middleware.js';
import errorHandler from '../utils/errorHandler.js';

import {
  home,
  getServerInfo} from '../controllers/mainController.js'

mainApi.get("", authorization , home);
mainApi.get("/info", getServerInfo)

mainApi.use(errorHandler)
export  {mainApi}