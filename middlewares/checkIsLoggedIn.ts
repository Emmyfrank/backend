import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import User from "../model/userModel";

// a middleware to protect routes that needs a user to be logged in

export default async function isLoggedIn(req: Request, res: Response, next: NextFunction){  
    try {
        let token: string = req.headers.authorization as string;
        if (token && token.startsWith("Bearer ")) {
          token = token.split(" ")[1];
        } else {
          return res.status(401).json({ message: "You need to sign in" });
        }     
      jwt.verify(token, String(process.env.JWT_SECRET), async function(err, decoded) {
        if(err) return res.status(401).json({ message: "Invalid token" });
        const user = await User.findById(decoded.userId);
        if (user) {
            req.user = user;
          return next();
        } else {
          return res.status(401).json({ message: "Token expired" });
        }
      });
    } catch (error) {
        console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
}