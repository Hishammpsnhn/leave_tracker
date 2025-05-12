import { UserRole } from "../constants/userRoles";
import EmployeeModel, { IUser } from "../models/employeesModel";
import DepartmentModel from "../models/deptModel";

class UserRepository {
  public async findByEmail(email: string): Promise<IUser | null> {
    return EmployeeModel.findOne({ email });
  }

  public async findById(id: string): Promise<IUser | null> {
    return EmployeeModel.findById(id);
  }

  public async findAll(query: string): Promise<IUser[]> {
    return EmployeeModel.find({ role: query })
      .select("firstName email")
      .populate("deptId", "name manager");
  }

  public async create(user: IUser): Promise<IUser> {
    return EmployeeModel.create(user);
  }

  public async getDashboardStats() {
    const totalEmployees = await EmployeeModel.countDocuments();

    const totalDepartments = await DepartmentModel.countDocuments()

    const totalSalaryResult = await EmployeeModel.aggregate([
      {
        $group: {
          _id: null,
          totalSalary: { $sum: "$salary" },
        },
      },
    ]);

    const totalSalary = totalSalaryResult[0]?.totalSalary || 0;

    return {
      totalEmployees,
      totalDepartments,
      totalSalary,
    };
  }
}

export default new UserRepository();
