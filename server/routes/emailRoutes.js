import express from "express";
const router = express.Router();
import { checkUserEmail } from "../controllers/emailController.js";


router.post("/check" , checkUserEmail);

export default router;