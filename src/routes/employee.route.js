import { Router } from "express";
import EmployeeController from "../controllers/employee/employee.controller.js";
import indexEmployeeValidation from "../requests/employee/indexEmployee.request.js";
import storeEmployeeValidation from "../requests/employee/storeEmployee.request.js";
import updateEmployeeValidation from "../requests/employee/updateEmployee.request.js";
import updateStatusEmployeeValidation from "../requests/employee/updateStatusEmployee.request.js";

const router = Router();
const employeeController = new EmployeeController();

router.get("/", indexEmployeeValidation, employeeController.index.bind(employeeController));
router.post("/", storeEmployeeValidation, employeeController.create.bind(employeeController));
router.patch("/:nip", updateEmployeeValidation, employeeController.update.bind(employeeController));
router.patch("/:nip/status", updateStatusEmployeeValidation, employeeController.updateStatus.bind(employeeController));

export default router;
