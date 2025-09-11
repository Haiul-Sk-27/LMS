import { json } from "express";
import { User } from "../models/user.models.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from "path";

export const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password || !role) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        const user = await User.findOne({ email })

        if (user) {
            return res.status(400).json({
                success: false,
                message: "User already exists with this email"
            })
        }

        const hashPassword = await bcrypt.hash(password, 10)

        await User.create({
            name,
            email,
            password: hashPassword,
            role
        })

        return res.status(201).json({
            success: true,
            message: "Account Create Successfully"
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            message: "failed to register"
        })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Incorrect email or password"
            });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                success: false,
                message: "Incorrect email or password"
            });
        }

        // generate token
        const token = jwt.sign(
            { userId: user._id },
            process.env.SECRET_KEY,
            { expiresIn: "1d" }
        );

        return res
            .cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",   // ✅ needed in prod
                sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // ✅ allow cross-site cookies
                maxAge: 24 * 60 * 60 * 1000
            })
            .json({
                message: `Welcome back ${user.name}`,
                success: true,
                user
            });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed to Login"
        });
    }
};

export const logout = async (__, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logout succesfully",
            success: true
        })
    } catch (err) {
        console.log(err)
        return res.status(400).json({
            success: true,
            message: "Logout successfully"
        })
    }
}

export const updateProfile = async (req, res) => {
    try {
        const userId = req.id; 
        const { name, description } = req.body;
        const file = req.file;

        if (!name?.trim() || !description?.trim() || !file) {
            console.log("❌ Missing required fields");
            return res.status(400).json({
                success: false,
                message: "All fields (name, description, profile picture) are required",
            });
        }

        const user = await User.findById(userId).select("-password");
        
        if (user.photoUrl) {
            const oldFilePath = path.join(process.cwd(), user.photoUrl);
            console.log("Deleting old file:", oldFilePath); 
            fs.unlink(oldFilePath, (err) => { });
        }

        user.photoUrl = `/uploads/profile/${file.filename}`;

        await user.save();

        return res.status(200).json({
            message: "Profile updated successfully",
            success: true,
            user,
        });
    } catch (error) {
        console.error("🔥 Error in updateProfile:", error);
        return res.status(500).json({ success: false, message: "Failed to update profile" });
    }
};
