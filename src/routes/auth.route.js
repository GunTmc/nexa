import { Router } from "express";
import loginValidation from "../requests/auth/login.validation.js";
import AuthController from "../controllers/auth/auth.controller.js";
const router = Router();

router.post("/login", loginValidation, new AuthController().login);

export default router;
