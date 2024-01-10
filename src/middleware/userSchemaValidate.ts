import {  userSchema } from "../domain/entities";
import { Response, Request, NextFunction } from "express"
import { Middleware } from '../factories/modelSchemaFactory';


export const userSchemaValidateMW: Middleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await userSchema.parseAsync(req.body)
        next()
    } catch (error) {
        res.status(500).json({ error: `One or more fields of the user schema are invalid.: ${error}` })
    }
}