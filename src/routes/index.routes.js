import { Router } from 'express';
import { getping } from '../controller/index.controllers.js';


const ruta = Router()

ruta.get('/ping', getping )

export default ruta