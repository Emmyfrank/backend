import express, { Request, Response } from "express";
import router from "./routes";
import morgan from "morgan";
import docrouter from "./documentation";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));

// Welcome route
app.get("/", (req:Request, res:Response) => res.send("Welcome home"));

// routes
app.use('/api/v1', router);

// documentation route
app.use('/docs', docrouter);


  export default app;
  