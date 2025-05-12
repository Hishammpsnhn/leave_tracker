import { Request, Response } from "express";
import authService from "../services/authService";
import { generateToken } from "../utils/jwt";

class AuthController {
  public async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        res.status(400).json({ message: "Email and password are required" });
        return;
      }

      const user = await authService.authenticateUser(email, password);

      if (!user) {
        res.status(401).json({ message: "Invalid credentials" });
        return;
      }

      const token = generateToken(user.id, user.role);
      res.status(200).json({ success: true, token, user });

    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

export default new AuthController();
