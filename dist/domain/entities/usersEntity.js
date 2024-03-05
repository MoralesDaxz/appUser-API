"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = exports.USER_ID_PREFIX = void 0;
const zod_1 = __importDefault(require("zod"));
exports.USER_ID_PREFIX = "user"; // este es el prefijo que llevara el id de cada usuario
exports.userSchema = zod_1.default.object({
    nie: zod_1.default.string(),
    nombre: zod_1.default.string(),
    apellido: zod_1.default.string(),
    edad: zod_1.default.number(),
    pais: zod_1.default.string(),
    ciudad: zod_1.default.string(),
});
