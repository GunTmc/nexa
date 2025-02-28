import AuthService from "../../services/auth/auth.service.js";

class AuthController {
  authService;
  constructor() {
    this.authService = new AuthService();
  }

  login = async (req, res) => {
    try {
      const data = req.body;
      const response = await this.authService.login(data);
      if (response.status == "UNAUTHORIZED") {
        res.status(401).json({
          message: response.message,
          status: response.status,
          data: null,
        });
      } else {
        res.status(200).json({
          message: "Success Login",
          status: response.status,
          data: {
            token: response.adminToken?.token,
            expiredt: response.adminToken?.expired_at,
          },
        });
      }
    } catch (err) {
      console.log("login Error", err);
      res.status(500).json({
        message: "Internal Server Error",
        status: "ERROR",
        data: null,
      });
    }
  }
}

export default AuthController;
