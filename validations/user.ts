import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { Roles } from "../helpers/types";

const registerSchem = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    username: Joi.string().required(),
    password: Joi.string().required(),
});
const loginSchem = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
})

export default async function validateRegister(req: Request, res: Response, next: NextFunction){
    try {
        req.body = await registerSchem.validateAsync(req.body, {abortEarly: false});
        return next();
    } catch (error: any) {
        return res.status(400).json({error: error.message})
    }
}

export const validateLogin = async (req: Request, res: Response, next: NextFunction) =>{
    try {
        req.body = await loginSchem.validateAsync(req.body, {abortEarly: false});
        return next();
    } catch (error: any) {
        return res.status(400).json({message: error.message})
    }
}

const roleSchem = Joi.object({
    userId: Joi.string().required(),
    role: Joi.string().required().valid(Roles.user, Roles.admin),
});

export const validateRole = async (req: Request, res: Response, next: NextFunction) =>{
    try {
        req.body = await roleSchem.validateAsync(req.body, {abortEarly: false});
        return next();
    } catch (error: any) {
        return res.status(400).json({message: error.message})
    }
}