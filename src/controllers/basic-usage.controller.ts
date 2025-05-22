import { Request, Response, NextFunction } from "express";
import { outputPlayer } from "../concepts/basic-usage";

export const basicUsageController = async (
    req: Request,
    res: Response,
) => {
    const data = outputPlayer();
    res.status(200).json({ success: true, data });
}