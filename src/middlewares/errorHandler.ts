import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { ZodError } from "zod";

export const errorHandler: ErrorRequestHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
    console.error("Error caught in errorHandler:", err);

    if (err instanceof ZodError) {
        res.status(422).json({
            success: false,
            message: "Validation error",
            issues: err.issues,
        });
        return;
    }

    // For signup - Catch email already exists error 
    if (
        typeof err === "object" &&
        err !== null &&
        "code" in err &&
        (err as any).code === 11000 &&
        "keyPattern" in err &&
        (err as any).keyPattern?.email
    ) {
        res.status(400).json({ message: "Email already exists" });
        return;
    }

    res.status(500).json({
        success: false,
        message: err instanceof Error ? err.message : "Internal server error",
    });
};