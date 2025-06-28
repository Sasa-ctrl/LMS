import express from "express"
import { register,login } from "../controller/user.controller.js";

const router= express.Router();

// router.route("/reg").post(register);
// router.route("/login").post(login);
router.post("/reg",register)

export default router;