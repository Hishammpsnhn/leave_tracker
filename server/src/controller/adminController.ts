import { Request, Response } from "express";
import adminService from "../services/adminService";
import { generateToken } from "../utils/jwt";
import { UserRole } from "../constants/userRoles";

class adminController {
  public async createEmp(req: Request, res: Response): Promise<void> {
    console.log(req.body);
    const user = await adminService.createEmployee({
      ...req.body,
      password: req.body.joiningDate,
      role: req.body.role === "Manager" ? UserRole.MANAGER : UserRole.EMPLOYEE,
    });

    if (!user) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }
    const token = generateToken(user.id);
    res.json({ token });
  }
}

export default new adminController();
