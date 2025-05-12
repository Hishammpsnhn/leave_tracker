import { Request, Response } from "express";
import adminService from "../services/adminService";
import { generateToken } from "../utils/jwt";
import { UserRole } from "../constants/userRoles";

class AdminController {
  public async createEmp(req: Request, res: Response): Promise<void> {
    try {
      console.log(req.body);

      const user = await adminService.createEmployee({
        ...req.body,
        password: req.body.joiningDate, 
      });

      if (!user) {
        res.status(400).json({ message: "Employee creation failed" });
        return;
      }

      res.status(201).json({ success: true, user });
    } catch (error) {
      console.error("Create employee error:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  public async createDepartment(req: Request, res: Response): Promise<void> {
    try {
      console.log(req.body);

      const dept = await adminService.createDept(req.body);

      if (!dept) {
        res.status(400).json({ message: "Department creation failed" });
        return;
      }

      res.status(201).json({ success: true, dept });
    } catch (error) {
      console.error("Create department error:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  public async getDepartment(req: Request, res: Response): Promise<void> {
    try {
      const dept = await adminService.getDept();

      res.status(200).json({ success: true, data: dept });
    } catch (error) {
      console.error("Get departments error:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  public async getEmployees(req: Request, res: Response): Promise<void> {
    try {
      const query = req.query.role;
      const employees = await adminService.getEmployee(query as string);
      res.status(200).json({ success: true, data: employees });
    } catch (error) {
      console.error("Get employees error:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

export default new AdminController();
