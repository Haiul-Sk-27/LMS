import { json } from "express";
import { User } from "../models/user.models.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from "path";
import crypto from "crypto"
import nodemailer from "nodemailer"

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
                secure: process.env.NODE_ENV === "production",  
                sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
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

export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ success: false, message: "Email is required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const resetToken = crypto.randomBytes(32).toString("hex");
        const hashToken = crypto.createHash("sha256").update(resetToken).digest("hex");

        user.resetPasswordToken = hashToken;
        user.resetPasswordExpire = Date.now() + 2 * 60 * 1000;
        await user.save();

        const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.SMTP_EMAIL,
                pass: process.env.SMTP_PASS
            }
        });

        await transporter.sendMail({
            from: process.env.SMTP_EMAIL,
            to: user.email,
            subject: "Password Reset Request",
            html: `<p>Click here to reset your password:</p> 
                   <a href="${resetUrl}">${resetUrl}</a>`
        });

        return res.json({
            success: true,
            message: "Reset password email sent"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Something went wrong" });
    }
};

export const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        const hashToken = crypto.createHash("sha256").update(token).digest("hex");

        const user = await User.findOne({
            resetPasswordToken: hashToken,
            resetPasswordExpire: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid or expired token" });
        }

        user.password = await bcrypt.hash(password, 10);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();

        return res.json({
            success: true,
            message: "Password reset successfully"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Failed to reset password" });
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
