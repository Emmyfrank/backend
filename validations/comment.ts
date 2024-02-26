import { NextFunction, Request, Response } from "express";
import Joi from "joi";

const commentSchem = Joi.object({
    name: Joi.string().required(),
    comment: Joi.string().required(),
})

export default async function validateComment(req: Request, res: Response, next: NextFunction){
    try {
        req.body = await commentSchem.validateAsync(req.body, {abortEarly: false});
        return next();
    } catch (error: any) {
        return res.status(400).json({error: error.message})
    }
}