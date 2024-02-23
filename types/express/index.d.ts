import { Request } from 'express';
import User from '../../model/userModel';


declare global {
  namespace Express {
    export interface Request {
      user: User;
    }
  }
}
