import express from "express"
import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDb from "./Database/db.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoute from "./route/user.route.js"

dotenv.config({});

const app = express();
connectDb();

app.use(express.json());
app.use(cors({
    origin:"http://localhost:8080",
    credentials:true

}));
app.use(cookieParser());

app.use("/regapi",userRoute)

const PORT=process.env.PORT||3000;

app.listen(PORT,()=>{
    console.log(`server listen at port ${PORT}`)
})

