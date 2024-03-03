import { NextFunction, Request, Response } from "express";
import Joi from "joi";

const messageSchem = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    message: Joi.string().required(),
})

export default async function validateMessage(req: Request, res: Response, next: NextFunction){
    try {
        req.body = await messageSchem.validateAsync(req.body, {abortEarly: false});
        return next();
    } catch (error: any) {
        return res.status(400).json({message: error.message})
    }
}