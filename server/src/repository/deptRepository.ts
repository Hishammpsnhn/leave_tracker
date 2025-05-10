import DeptModel, { Department } from "../models/deptModel";

class DeptRepository {
  public async getAll(): Promise<Department[]> {
    return DeptModel.find({}).populate('managerId','firstName');
  }
  public async findOne(name: string): Promise<Department | null> {
    return DeptModel.findOne({ name });
  }

  public async create(deptDetails: Department): Promise<Department> {
    return DeptModel.create(deptDetails);
  }
}

export default new DeptRepository();
