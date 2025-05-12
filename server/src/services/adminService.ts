import bcrypt from "bcryptjs";
import { IUser } from "../models/employeesModel";
import userRepository from "../repository/userRepository";
import deptRepository from "../repository/deptRepository";
import { Department } from "../models/deptModel";
import { UserRole } from "../constants/userRoles";

class AdminService {
  public async createEmployee(EmpDetails: IUser): Promise<IUser | null> {
    if (EmpDetails.role !== UserRole.MANAGER) {
      const dept = await deptRepository.findOne(EmpDetails.role);
      if (!dept || !dept._id) {
        return null;
      }
      EmpDetails.role = UserRole.EMPLOYEE;
      EmpDetails.deptId = dept?.id;
    }

    const user = await userRepository.create(EmpDetails);
    if (!user) return null;
    const match = await bcrypt.compare(EmpDetails.password, user.password);
    return match ? user : null;
  }

  public async createDept(deptDetails: Department): Promise<Department | null> {
    const dept = await deptRepository.create(deptDetails);
    if (!dept) return null;

    return dept;
  }

  public async getDept(): Promise<Department[] | null> {
    const departments = await deptRepository.getAll();
    if (!departments) return null;

    return departments;
  }
  public async getEmployee(query:string): Promise<IUser[]> {
    const employee = await userRepository.findAll(query);
    return employee;
  }
  public async getDashboardStats() {
    const employee = await userRepository.getDashboardStats();
    return employee;
  }
}

export default new AdminService();
