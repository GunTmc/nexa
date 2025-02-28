import EmployeeService from "../../services/employee/employee.service.js";

class EmployeeController {
    constructor() {
        this.employeeService = new EmployeeService();
    }

    async index(req, res) {
        try {

            const employees = await this.employeeService.dataEmployee(req.query);
            res.status(200).json({
                message: "Success",
                status: "OK",
                data: employees,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: "Internal Server Error",
                status: "ERROR",
            });
        }
    }

    async create(req, res) {
        try {
            const employee = await this.employeeService.createEmployee(req.body, req.admin);

            if (employee.status == "BAD_REQUEST") {
                return res.status(400).json({
                    message: employee.message,
                    status: employee.status,
                    data: null,
                });
            }

            res.status(201).json({
                message: "Success Create Employee",
                status: "OK",
                data: employee,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: "Internal Server Error",
                status: "ERROR",
            });
        }
    }

    async update(req, res) {
        try {
            const employee = await this.employeeService.updateEmployee(req.params.nip, req.body, req.admin);
            if (employee.status == "BAD_REQUEST") {
                return res.status(400).json({
                    message: employee.message,
                    status: employee.status,
                    data: null,
                });
            }

            res.status(200).json({
                message: "Success Update Employee",
                status: "OK",
                data: employee,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: "Internal Server Error",
                status: "ERROR",
            });
        }
    }

    async updateStatus(req, res) {
        try {
            const employee = await this.employeeService.updateEmployee(req.params.nip, req.body, req.admin);
            if (employee.status == "BAD_REQUEST") {
                return res.status(400).json({
                    message: employee.message,
                    status: employee.status,
                    data: null,
                });
            }

            res.status(200).json({
                message: "Success Update Employee",
                status: "OK",
                data: employee,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: "Internal Server Error",
                status: "ERROR",
            });
        }
    }
}

export default EmployeeController;
