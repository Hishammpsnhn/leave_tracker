import { ILeaveRequest, LeaveRequestDTO } from "../models/LeaveRequest";
import deptRepository from "../repository/deptRepository";
import leaveRequestRepository from "../repository/LeaveRequestReposiotory";
import userRepository from "../repository/userRepository";

class LeaveRequestService {
  public async createRequest(
    data: LeaveRequestDTO<string>
  ): Promise<ILeaveRequest | null> {
    const user = await userRepository.findById(String(data.empId));
    if (!user || !user.deptId) return null;

    const req = await leaveRequestRepository.create({
      ...data,
      deptId: user.deptId,
    });
    if (!data) return null;
    return req;
  }
  public async getRequestForApproval(
    manageId: string
  ): Promise<ILeaveRequest[] | null> {
    const dept = await deptRepository.getAllByManager(manageId);
    console.log(dept);
    if (!dept || !dept._id) return null;
    const reqs = await leaveRequestRepository.getForApproval(dept._id);
    return reqs;
  }
  public async update(
    id: string,
    updateData: Partial<LeaveRequestDTO>
  ): Promise<ILeaveRequest | null> {
    const reqs = await leaveRequestRepository.update(id,updateData);
    if(reqs) return null
    return reqs;
  }
}

export default new LeaveRequestService();
