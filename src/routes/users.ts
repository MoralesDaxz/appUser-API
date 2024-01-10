import { Router } from "express"
import { createUser, deleteUser, getUserById, getUsers, updateUser } from "../controllers"
import { userSchemaValidateMW } from "../middleware/userSchemaValidate"
import modelSchemaFactory from "../factories/modelSchemaFactory"


const routeUser = Router()

routeUser.get('/user', getUsers)
routeUser.get('/user/:id', getUserById)
routeUser.post('/user', modelSchemaFactory([userSchemaValidateMW]), createUser)
routeUser.put('/user/:id', updateUser)
routeUser.delete('/user/:id', deleteUser)

export default routeUser