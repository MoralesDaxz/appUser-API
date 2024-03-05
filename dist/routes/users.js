"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const userSchemaValidate_1 = require("../middleware/userSchemaValidate");
const modelSchemaFactory_1 = __importDefault(require("../factories/modelSchemaFactory"));
const routeUser = (0, express_1.Router)(); //englobamos rutas para exportar
routeUser.get('/user', controllers_1.getUsers);
routeUser.get('/user/:id', controllers_1.getUserById);
routeUser.post('/user', (0, modelSchemaFactory_1.default)([userSchemaValidate_1.userSchemaValidateMW]), controllers_1.createUser);
routeUser.put('/user/:id', controllers_1.updateUser);
routeUser.delete('/user/:id', controllers_1.deleteUser);
exports.default = routeUser;
