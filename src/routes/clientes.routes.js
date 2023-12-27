import {Router} from 'express'
import {getclientes, postclientes, putclientes, deleteclientes,getusuario, getmedidor, getBuscar} from '../controller/clientes.controller.js';

const ruta = Router()

ruta.get("/users",getclientes)
ruta.get("/buscar", getBuscar)
ruta.get("/users/:id",getusuario)
ruta.get("/medidor/:id",getmedidor)
ruta.post("/users", postclientes)
ruta.put("/users/:id",putclientes)
ruta.delete("/users/:id", deleteclientes)


export default ruta;