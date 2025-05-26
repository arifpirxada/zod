import { Request, Response } from "express";
import jwt from "jsonwebtoken"
import userModel from "../models/user.model"
import bcrypt from "bcryptjs"

export const signupController = async (
    req: Request,
    res: Response
) => {
    const userData = req.body;

    const newUser = new userModel({
        name: userData.name,
        email: userData.email,
        password: userData.password
    })

    if (!process.env.JWT_SECRET_KEY) throw new Error("JWT_SECRET_KEY is not defined in environment variables");

    newUser.token = jwt.sign({ id: newUser._id.toString() }, process.env.JWT_SECRET_KEY)

    newUser.save();

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
    const userData = req.body;
    const existingUser = await userModel.findOne({ email: userData.email });

    if (!existingUser) {
        res.status(400).json({ success: false, message: "User not found!" });
        return;
    }

    const passMatch = await bcrypt.compare(userData.password, existingUser.password);

    if (!passMatch) {
        res.status(400).json({ success: false, message: "Incorrect password!" });
        return;
    }

    if (!process.env.JWT_SECRET_KEY) throw new Error("JWT_SECRET_KEY is not defined in environment variables");

    const newToken = jwt.sign({ id: existingUser._id.toString() }, process.env.JWT_SECRET_KEY)

    existingUser.token = newToken;

    await existingUser.save();

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