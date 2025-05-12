import mongoose from "mongoose";
import LeaveModel, {
  ILeaveRequest,
  LeaveRequestDTO,
} from "../models/LeaveRequest";

class LeaveRequestRepository {
  public async create(
    leaveRequest: LeaveRequestDTO<string>
  ): Promise<ILeaveRequest | null> {
    const request = await LeaveModel.create(leaveRequest);
    if (!request) {
      return null;
    }
    return request;
  }
  public async getForApproval(deptId: any): Promise<ILeaveRequest[]> {
    const request = await LeaveModel.find({
      deptId,
      status: "Pending",
    });
    return request;
  }
  public async update(
    id: string,
    updateData: Partial<LeaveRequestDTO>
  ): Promise<ILeaveRequest | null> {
    const updatedRequest = await LeaveModel.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    return updatedRequest;
  }
}
export default new LeaveRequestRepository();
