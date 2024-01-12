import zod from "zod";
import { BaseEntity } from "./base";

export const USER_ID_PREFIX = "user"; // este es el prefijo que llevara el id de cada usuario

export const userSchema = zod.object({
  nie: zod.string(),
  nombre: zod.string(),
  apellido: zod.string(),
  edad: zod.number(),
  pais: zod.string(),
  ciudad: zod.string(),
});

export type UserDTO = zod.infer<typeof userSchema> & BaseEntity