import { UserRole } from "../constants/userRoles";
import EmployeeModel, { IUser } from "../models/employeesModel";

class UserRepository {
  public async findByEmail(email: string): Promise<IUser | null> {
    return EmployeeModel.findOne({ email });
  }
  public async findById(id: string): Promise<IUser | null> {
    return EmployeeModel.findById(id);
  }
  public async findAll(query:string): Promise<IUser[]> {
    return EmployeeModel.find({role:query})
      .select("firstName email")
      .populate("deptId", "name manager");
  }

  public async create(user: IUser): Promise<IUser> {
    return EmployeeModel.create(user);
  }
}

export default new UserRepository();
