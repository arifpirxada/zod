import { Request, Response } from "express";
import jwt from "jsonwebtoken"
import userModel from "../models/user.model"
import bcrypt from "bcryptjs"
import { loginSchema, signupSchema } from "../schemas/user.schema";

export const signupController = async (
    req: Request,
    res: Response
) => {
    const validated = signupSchema.parse(req.body) // Zod validataion

    const JWT_SECRET = process.env.JWT_SECRET_KEY;
    if (!JWT_SECRET) throw new Error("JWT_SECRET_KEY is not defined in environment variables");

    const newUser = new userModel(validated);

    newUser.token = jwt.sign({ id: newUser._id.toString() }, JWT_SECRET)

    await newUser.save();

    res.cookie("auth", newUser.token, {
        httpOnly: true,
        sameSite: "strict",
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 Days
    })

    res.status(201).json({
        success: true,
        message: "Insertion successful"
    })
}

export const loginController = async (
    req: Request,
    res: Response
) => {
    const validated = loginSchema.parse(req.body);
    const { email, password } = validated;

    const existingUser = await userModel.findOne({ email });
    if (!existingUser) {
        return res.status(400).json({ success: false, message: "User not found!" });
    }

    const passMatch = await bcrypt.compare(password, existingUser.password);
    if (!passMatch) {
        return res.status(400).json({ success: false, message: "Incorrect password!" });
    }

    const JWT_SECRET = process.env.JWT_SECRET_KEY;
    if (!JWT_SECRET) throw new Error("JWT_SECRET_KEY is not defined in environment variables");

    const newToken = jwt.sign({ id: existingUser._id.toString() }, JWT_SECRET)
    await userModel.updateOne({ _id: existingUser._id }, { token: newToken });

    res.cookie("auth", newToken, {
        httpOnly: true,
        sameSite: "strict",
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
    })

    res.status(200).json({ success: true, message: "Login successful" });
}

export const logoutController = async (
    req: Request,
    res: Response
) => {
    res.clearCookie("auth");
    await userModel.findByIdAndUpdate({ _id: req.body.id }, { $set: { token: "" } });
    res.status(200).json({ success: true, message: "Logout successful" })
}