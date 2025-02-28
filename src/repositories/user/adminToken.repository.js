import AdminToken from "../../models/adminToken.js";

class AdminTokenRepository {
  async updateOrCreateAdminToken(data) {
    const [adminToken, created] = await AdminToken.findOrCreate({
      where: { id_admin: data.id_admin },
      defaults: data,
    });
    if (!created) {
      await adminToken.update(data);
    }
    return adminToken;
  }

  async getAdminByTokenAndIdAdmin(token, adminId) {
    const admin = await AdminToken.findOne({ where: { token: token, id_admin: adminId } });
    return admin;
  }
}

export default AdminTokenRepository;
