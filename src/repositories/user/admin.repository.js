import Admin from "../../models/admin.js";

class AdminRepository {
  async getAdminByUSername(username) {
    const admin = await Admin.findOne({ where: { username: username } });
    return admin;
  }
}

export default AdminRepository;
