import { NextFunction, Request, Response } from "express";
import User from "../model/userModel";
import { Roles } from "../helpers/types";

// a middleware to protect routes that needs a user to be logged in and is admin

export default async function isAdmin(req: Request, res: Response, next: NextFunction){  
    try {
      if(!req.user) return res.status(401).json({ message: "You need to sign in" });
      if(req.user.role !== Roles.admin) return res.status(403).json({ message: "Only admin is allowed" });
      return next();
    } catch (error) {
        console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
}