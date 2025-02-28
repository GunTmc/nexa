import { Router } from "express";

const router = Router();
import authRouter from "./auth.route.js";
import employeeRouter from "./employee.route.js";
import authMiddleware from "../middlewares/auth.middleware.js";

router.use("/auth", authRouter);
router.use("/employee", authMiddleware, employeeRouter);

export default router;