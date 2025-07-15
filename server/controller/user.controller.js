import mongoose from "mongoose";
import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs"
import { generateToken } from "../utils/generateToken.js"
import { deletMediaFromCloudinary, uploadMedia } from "../utils/cloudinary.js";
 import fs from 'fs';


export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All field are required."
            })
        }
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                success: false,
                message: "User already exists, login with email and password"
            })
        }
        const hashedpassword = await bcrypt.hash(password, 12)
        await User.create({
            name,
            email,
            password: hashedpassword
        });
        return res.status(201).json({
            success: true,
            message: "congrates your account been created"

        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "internal server error failed to register"
        })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required."
            });
        }
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Incorrect eamil or password"
            })
        }

        const isPassword = await bcrypt.compare(password, user.password);
        if (!isPassword) {
            return res.status(400).json({
                success: false,
                message: "Incorrect eamil or password"
            });
        }
        generateToken(res, user, `welcome back ${user.name}`)


        // Add your login logic here
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error during login"
        });
    }
};
export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "loggedout succesfully",
            success: true
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "failed to logout"
        });
    }
};
export const getUserProfile = async (req, res) => {
    try {
        const userId = req.id;
        const user = await User.findById(userId).select("-password");
        if (!user) {
            return res.status(404).json({
                message: "profile not found",
                success: false
            })
        }
        return res.status(200).json({
            success: true,
            user
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "failed to Load User"
        });
    }
}

export const UpdateProfile = async (req, res) => {
    try {
        const userId = req.id;
        const { name } = req.body;
        const profilePhoto = req.file;

        if (!name || !profilePhoto) {
            return res.status(400).json({
                success: false,
                message: "Name and profile photo are required"
            });
        }


        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: "profile not found",
                success: false
            })
        }

        if (user.photoUrl) {
            const publicId = user.photoUrl.split("/").pop().split(".")[0];
            deletMediaFromCloudinary(publicId);
        }
        const cloudResponse = await uploadMedia(profilePhoto.path);

        const photo = cloudResponse.secure_url;
        const public_id = cloudResponse.public_id;
        if (!cloudResponse || !cloudResponse.secure_url || !cloudResponse.public_id) {
            return res.status(500).json({
                success: false,
                message: "Cloudinary upload failed"
            });
        }
        const UpdatedData = { name, photoUrl: photo, PhotoPublicId: public_id }
        const updatedUser = await User.findByIdAndUpdate(userId, UpdatedData, { new: "true" }).select("-password")
        return res.status(200).json({
            success: true,
            user: updatedUser,
            message: "file successfully updated"
        })

       
        fs.unlink(profilePhoto.path, (err) => {
            if (err) console.error("Failed to delete temp file:", err);
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "failed to Load profile"
        })
    }
}