import bcrypt from "bcryptjs";
import { IUser } from "../models/employeesModel";
import userRepository from "../repository/userRepository";

class AdminService {
  public async createEmployee(EmpDetails: IUser): Promise<IUser | null> {

    const user = await userRepository.create(EmpDetails);
    if (!user) return null;

    const match = await bcrypt.compare(EmpDetails.password, user.password);
    return match ? user : null;
  }
}

export default new AdminService();
