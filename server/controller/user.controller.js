import mongoose from "mongoose";
import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs"
import {generateToken} from "../utils/generateToken.js"
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
        const hashedpassword = await bcrypt.hash(password, 10)
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
        const user=await User.findOne({email});

        if(!user){
            return res.status(400).json({
                success:false,
                message:"Incorrect eamil or password"
            })
        }

        const isPassword= await bcrypt.compare(password,user.password);
        if(!isPassword){
             return res.status(400).json({
                success: false,
                  message:"Incorrect eamil or password"
            });
        }
        generateToken(res,user,`welcome back ${user.name}`)

        
        // Add your login logic here
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error during login"
        });
    }
};