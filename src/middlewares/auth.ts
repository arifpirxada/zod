import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import userModel from "../models/user.model";

const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.auth;
        const JWT_SECRET = process.env.JWT_SECRET_KEY;
        if (!JWT_SECRET) throw new Error("Missing JWT secret");

        if (!token) return next();

        const decoded = jwt.verify(token, JWT_SECRET) as { id: string };

        const userExists = await userModel.exists({ _id: decoded.id, token });
        if (!userExists) return next();
    
        (req as any).user = userExists;
        next();
    } catch (err) {
        next();
    }
}

export default auth;