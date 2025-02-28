import jsonwebtoken from "jsonwebtoken";
import AdminTokenRepository from "../repositories/user/adminToken.repository.js";
import AdminRepository from "../repositories/user/admin.repository.js";

function getTokenFromHeader(req) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return null;
    }
    return authHeader.split(" ")[1];
}

const authMiddleware = async (req, res, next) => {
    try {
        const token = getTokenFromHeader(req);
        if (!token) {
            return res.status(401).json({ message: "Unauthorized - Token not found" });
        }

        const payload = jsonwebtoken.decode(token);
        if (!payload) {
            return res.status(401).json({ message: "Unauthorized - Invalid token" });
        }
        const adminTokenRepository = new AdminTokenRepository();
        const adminToken = await adminTokenRepository.getAdminByTokenAndIdAdmin(token, payload.admin_id);

        if (!adminToken) {
            return res.status(401).json({ message: "Unauthorized - Token not registered" });
        }

        if (new Date(adminToken.expired_at) < new Date()) {
            return res.status(401).json({ message: "Unauthorized - Token expired" });
        }
        const adminRepository = new AdminRepository();
        const admin = await adminRepository.getAdminByUSername(payload.username);

        req.admin = admin;
        next();
    } catch (error) {
        console.error("Auth Middleware Error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export default authMiddleware;
