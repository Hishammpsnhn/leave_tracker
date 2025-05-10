import EmployeeModel, { IUser } from "../models/employeesModel";

class UserRepository {
  public async findByEmail(email: string): Promise<IUser | null> {
    return EmployeeModel.findOne({ email });
  }

  public async create(user: IUser): Promise<IUser> {
    console.log(user)
    return EmployeeModel.create(user);
  }
}

export default new UserRepository();
