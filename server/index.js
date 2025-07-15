import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDb from "./Database/db.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoute from "./route/user.route.js";

dotenv.config();

const app = express();

// Connect DB
connectDb();

// Middleware
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(cookieParser()); // ✅ with parentheses!

// Routes
app.use("/regapi", userRoute);

// Listen on correct port
const PORT = process.env.PORT || 8080;
app.listen(PORT, "0.0.0.0", () => { // ✅ Binds to all interfaces, not just localhost
  console.log(`server listen at port ${PORT}`);
});
