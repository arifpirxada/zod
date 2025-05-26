import { z } from "zod";

export const signupSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email"),
    password: z.string().min(4, "Password must have at least 4 characters"),
    age: z.number().min(18, "Age must be at least 18"),
    token: z.string().optional()
})

export const loginSchema = z.object({
    email: z.string().email("Invalid email"),
    password: z.string().min(4, "Password must have at least 4 characters"),
})