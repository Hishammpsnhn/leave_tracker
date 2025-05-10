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
    });

    if (!user) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }
    const token = generateToken(user.id);
    res.json({ token });
  }

  public async createDepartment(req: Request, res: Response): Promise<void> {
    console.log(req.body);
    const dept = await adminService.createDept(req.body);

    if (!dept) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }
    res.status(201).json({ success: true, dept });
  }

  public async getDepartment(req: Request, res: Response): Promise<void> {
    const dept = await adminService.getDept();

    if (!dept) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }
    res.status(200).json({ success: true, data: dept });
  }
  public async getEmployees(req: Request, res: Response): Promise<void> {
    const query = req.query.role
    const employees = await adminService.getEmployee(query as string);

    res.status(200).json({ success: true, data: employees });
  }
}

export default new adminController();
