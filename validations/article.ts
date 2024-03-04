import { NextFunction, Request, Response } from "express";
import Joi from "joi";

const articleSchem = Joi.object({
    title: Joi.string().required(),
    image: Joi.string().required(),
    description: Joi.string().required(),
})

export default async function validateArticle(req: Request, res: Response, next: NextFunction){
    try {
        req.body = await articleSchem.validateAsync(req.body, {abortEarly: false});
        return next();
    } catch (error: any) {
        return res.status(400).json({error: error.message})
    }
}

const updateArticleSchem = Joi.object({
    title: Joi.string().optional(),
    image: Joi.string().optional(),
    description: Joi.string().optional(),
}).min(1);

export const validateUpdateArticle = async (req: Request, res: Response, next: NextFunction) =>{
    try {
        req.body = await updateArticleSchem.validateAsync(req.body, {abortEarly: false});
        return next();
    } catch (error: any) {
        return res.status(400).json({error: error.message})
    }
}
