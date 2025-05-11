import { Request, Response } from "express";
import authService from "../services/authService";
import { generateToken } from "../utils/jwt";
import { emit } from "process";

class AuthController {
  public async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;
    console.log(email,password)
    const user = await authService.authenticateUser(email, password);
    if (!user) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }
    const token = generateToken(user.id,user.role);
    res.status(200).json({ success: true, token, user });
  }
}

export default new AuthController();
