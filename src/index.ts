import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routeUser from "./routes/users";

dotenv.config();

const app = express();
app.use(cors({origin: true, credentials: true}));
app.use(express.json());
app.use('/api', routeUser)
const port = process.env.PORT || 8081;

// app.get("/libros", (_req:Request, res:Response) => {
//     res.send("Bienvenido a la app de libros");
//   });

app.listen(port, () => {
  console.log(`USERS_API: Listening on port ${port}`);
});

module.exports = app;