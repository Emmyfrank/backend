import { Request, Response } from 'express';

const notFound = (req:Request, res:Response) => {
    return res.status(404).json({error: `${req.originalUrl} is not found!`});
  };

  export default notFound;