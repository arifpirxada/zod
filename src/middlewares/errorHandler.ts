import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

export const errorHandler = (
    err: unknown,
    _req: Request,
    res: Response,
    _next: NextFunction
) => {
    console.error("Error caught in errorHandler:", err);

    if (err instanceof ZodError) {
        res.status(422).json({
            success: false,
            message: "Validation error",
            issues: err.issues,
        });
        return;
    }

    res.status(500).json({
        success: false,
        message: err instanceof Error ? err.message : "Internal server error",
    });
};