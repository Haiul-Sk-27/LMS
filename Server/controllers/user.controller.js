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

            // ✉️ send login success email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASS
      }
    });

    await transporter.sendMail({
      from: `"Your App Name" <${process.env.SMTP_EMAIL}>`,
      to: user.email,
      subject: "✅ Login Successful",
      html: `
      <div style="font-family: Arial, sans-serif; line-height:1.6; color:#333; max-width:600px; margin:auto; border:1px solid #eee; border-radius:8px; overflow:hidden;">
        <div style="background:#2563eb; color:white; padding:16px; text-align:center;">
          <h2 style="margin:0;">Hi, ${user.name}</h2>
        </div>
        <div style="padding:24px;">
          <h3>Hello ${user.name || "User"},</h3>
          <p>This is to let you know that your account was successfully <strong>logged in</strong>.</p>

          <p>📅 <strong>Login time:</strong> ${new Date().toLocaleString()}</p>

          <p>If this wasn’t you, please <a href="haiulsk037@gmail.com" style="color:#2563eb; text-decoration:none;">contact support immediately</a> and reset your password.</p>
        </div>
        <div style="background:#f9fafb; padding:16px; font-size:12px; text-align:center; color:#666;">
          <p>© ${new Date().getFullYear()} Your App Name. All rights reserved.</p>
        </div>
      </div>
      `
    });

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
                user,
                token
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
            subject: "🔐 Password Reset Request",
            html: `
  <div style="font-family: Arial, sans-serif; line-height:1.6; color:#333; max-width:600px; margin:auto; border:1px solid #eee; border-radius:8px; overflow:hidden;">
    <div style="background:#2563eb; color:white; padding:16px; text-align:center;">
      <h2 style="margin:0;">${user.name}</h2>
    </div>
    <div style="padding:24px;">
      <h3>Hello ${user.name || "User"},</h3>
      <p>We received a request to reset your password. If this was you, please click the button below to reset your password:</p>
      
      <div style="text-align:center; margin:24px 0;">
        <a href="${resetUrl}" 
           style="background:#2563eb; color:white; text-decoration:none; padding:12px 24px; border-radius:6px; display:inline-block; font-weight:bold;">
          Reset My Password
        </a>
      </div>

      <p>If the button above doesn’t work, you can also copy and paste the following link into your browser:</p>
      <p style="word-break: break-all; color:#2563eb;">${resetUrl}</p>

      <p><strong>Note:</strong> This link is valid for only <b>2 minutes</b>. If you did not request this, you can safely ignore this email.</p>
    </div>
    <div style="background:#f9fafb; padding:16px; font-size:12px; text-align:center; color:#666;">
      <p>© ${new Date().getFullYear()} LMS. All rights reserved.</p>
    </div>
  </div>
  `
        });

        return res.json({
            success: true,
            message: "Reset password email sent",
            resetUrl
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

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.SMTP_EMAIL,
                pass: process.env.SMTP_PASS
            }
        });

        await transporter.sendMail({
            from: process.env.SMTP_EMAIL,
            to: user.email,
            subject: "✅ Password reset successful",
            html: `
  <div style="font-family: Arial, sans-serif; line-height:1.6; color:#333; max-width:600px; margin:auto; border:1px solid #eee; border-radius:8px; overflow:hidden;">
    <div style="background:#16a34a; color:white; padding:16px; text-align:center;">
      <h2 style="margin:0;">${user.name}</h2>
    </div>
    <div style="padding:24px;">
      <h3>Hello ${user.name || "User"},</h3>
      <p>This is a confirmation that your password has been <strong>reset successfully</strong>.</p>
      
      <p>📅 <strong>Reset on:</strong> ${new Date().toLocaleString()}</p>
      
      <p>If this was <strong>not you</strong>, please <a href="mailto:support@yourapp.com" style="color:#2563eb; text-decoration:none;">contact our support team</a> immediately to secure your account.</p>
      
      <div style="margin:24px 0; text-align:center;">
        <a href="${process.env.FRONTEND_URL}/login"
           style="background:#16a34a; color:white; text-decoration:none; padding:12px 24px; border-radius:6px; display:inline-block; font-weight:bold;">
          Go to Login
        </a>
      </div>
    </div>
    <div style="background:#f9fafb; padding:16px; font-size:12px; text-align:center; color:#666;">
      <p>© ${new Date().getFullYear()} Your App Name. All rights reserved.</p>
    </div>
  </div>
  `
        })

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
