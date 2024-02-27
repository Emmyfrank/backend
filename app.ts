import express, { Request, Response } from "express";
import router from "./routes";
import morgan from "morgan";
import {swaggerOptions, swaggerRoute} from "./documentation";
import notFound from "./controllers/notFount";

const app = express();

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json")

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));


// Welcome route
app.get("/", (req:Request, res:Response) => res.send("Welcome home"));

// routes
app.use('/api/v1', router);

// documentation route
app.use('/docs', swaggerRoute);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));// Serve swagger UI

// will handle all routes that do not exist
app.all("*", notFound);



export default app;
  