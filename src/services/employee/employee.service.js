import EmployeeRepository from "../../repositories/employee/employee.repository.js";
import uploadBase64 from "../upload/upload.service.js";
class EmployeeService {
    constructor() {
        this.employeeRepository = new EmployeeRepository();
    }

    async dataEmployee(data) {
        const requestEmployee = {
            'search': data.search ?? null,
            'page': parseInt(data.page) ?? 1,
            'limit': parseInt(data.size, 10) || 10
        }
        return await this.employeeRepository.getAllEmployee(requestEmployee);
    }

    async createEmployee(data, admin) {
        try {
            var path = null;
            if (data.photo) {
                path = await uploadBase64(data.photo, data.nip);
            }

            const requestEmployee = {
                'nip': data.nip,
                'nama': data.name,
                'alamat': data.address,
                'gend': data.gender,
                'photo': path,
                'tgl_lahir': data.dateOfBirth,
                'status': data.status,
                'insert_at': new Date(),
                'insert_by': admin.username,
                'update_at': new Date(),
                'update_by': admin.username
            }
            const employee = await this.employeeRepository.getEmployeeByNip(data.nip);
            if (employee) {
                return {
                    message: "Nip already exist",
                    status: "BAD_REQUEST",
                    data: null
                }
            }
            return await this.employeeRepository.createEmployee(requestEmployee);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async updateEmployee(nip, data, admin) {
        try {
            const employee = await this.employeeRepository.getEmployeeByNip(nip);
            if (!employee) {
                return {
                    message: "Nip not found",
                    status: "BAD_REQUEST",
                    data: data
                }
            }

            var path = employee.photo;

            if (data.photo) {
                path = await uploadBase64(data.photo, nip);
            }

            const requestEmployee = {
                'nip': nip,
                'nama': data.name ?? employee.nama,
                'alamat': data.address ?? employee.alamat,
                'gend': data.gender ?? employee.gend,
                'photo': path,
                'tgl_lahir': data.dateOfBirth ?? employee.tgl_lahir,
                'status': data.status ?? employee.status,
                'update_at': new Date(),
                'update_by': admin.username
            }

            await this.employeeRepository.updateEmployee(nip, requestEmployee);
            return this.employeeRepository.getEmployeeByNip(nip);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async getEmployee(nip) {
        return await this.employeeRepository.getEmployeeByNip(nip);
    }

    async updateStatus(data) {
        return await this.employeeRepository.updateEmployee(data.nip, { status: data.status });
    }
}

export default EmployeeService;