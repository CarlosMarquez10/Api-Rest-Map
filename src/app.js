import express from "express";
import rutadata from "./routes/clientes.routes.js";
import indexroutes from "./routes/index.routes.js";
import bodyParser from 'body-parser';
import cors from 'cors';


const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: "70mb" }));
app.use(bodyParser.urlencoded({ limit: "70mb", extended: true }));
app.use(express.json());
app.use("/api", indexroutes);
app.use("/api", rutadata);

app.use((req, res, next) =>{
    res.status(404).json({
        message: 'La ruta no es valida, no se encontro'
    })
})

export default app;