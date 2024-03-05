"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express")); //framework - libreria
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const users_1 = __importDefault(require("./routes/users"));
dotenv_1.default.config(); //Usa variables de entorno del .env
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: true, credentials: true })); //medidas de seguridad
app.use(express_1.default.json()); //Usa programas antes del endpoint (middlewares) - Valida envio y recepcion de json
app.use('/api', users_1.default); //agrega '/api' a todas las rutas que meteremos en routeUser
const port = process.env.PORT || 8081; //asignamos puerto
app.listen(port, () => {
    console.log(`USERS_API: Listening on port ${port}`);
}); // levantamos la API en el puerto que indicamos
module.exports = app;
