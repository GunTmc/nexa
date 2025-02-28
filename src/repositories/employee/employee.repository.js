import { Op } from "sequelize";
import Employee from "../../models/employee.js";

class EmployeeRepository {

    async createEmployee(data) {
        const employee = await Employee.create(data);
        return employee;
    }

    async updateEmployee(nip, data) {
        const employee = await Employee.update(data, { where: { nip: nip } });
        return employee;
    }

    async getEmployeeByNip(nip) {
        const employee = await Employee.findByPk(nip);
        return employee;
    }

    async getAllEmployee({ search = null, page = 1, limit = 10 }) {
        const offset = (page - 1) * limit;
        const whereCondition = {};
        if (search) {
            whereCondition.nama = { [Op.like]: `%${search}%` };
        }

        const { count, rows } = await Employee.findAndCountAll({
            where: whereCondition,
            limit,
            offset,
            order: [["nama", "ASC"]],
        });

        return {
            data: rows,
            total: count,
            currentPage: page,
            totalPages: Math.ceil(count / limit),
        };
    }
}

export default EmployeeRepository