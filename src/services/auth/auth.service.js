import encryptConfig from "../../config/encrypt.config.js";
import AdminRepository from "../../repositories/user/admin.repository.js";
import AdminTokenRepository from "../../repositories/user/adminToken.repository.js";
import jsonwebtoken from "jsonwebtoken";

const { encryptAES } = encryptConfig;
// eslint-disable-next-line no-undef
const JWT_SECRET = process.env.JWT_SECRET;

class AuthService {
  constructor() {
    this.adminRepository = new AdminRepository();
    this.adminTokenRepository = new AdminTokenRepository();
  }

  async login(data) {
    const admin = await this.adminRepository.getAdminByUSername(data.username);
    if (!admin) {
      return {
        message: "Email and Password Not Match",
        status: "UNAUTHORIZED",
        token: null,
        admin: null,
      };
    } else if (!encryptAES(data.password) === admin.password) {
      return {
        message: "Email and Password Not Match",
        status: "UNAUTHORIZED",
        token: null,
        user: null,
      };
    }

    // generate token
    const token = await jsonwebtoken.sign(
      { username: admin.username, admin_id: admin.id },
      JWT_SECRET,
      { expiresIn: "1h" },
    );

    const requestAdminToken = {
      id_admin: admin.id,
      expired_at: new Date(Date.now() + 60 * 60 * 1000),
      token: token,
    };

    // updateOrCreate token
    const adminToken =
      await this.adminTokenRepository.updateOrCreateAdminToken(
        requestAdminToken,
      );
    return {
      message: "Success Login",
      status: "SUCCESS",
      adminToken: adminToken,
      admin: admin,
    };
  }
}

export default AuthService;
