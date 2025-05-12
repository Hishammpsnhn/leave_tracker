import mongoose from "mongoose";
import LeaveModel, {
  ILeaveRequest,
  LeaveRequestDTO,
} from "../models/LeaveRequest";
import { sendEmail } from "../utils/mailService";
import userRepository from "./userRepository";

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
    }).populate("empId", "firstName");
    return request;
  }
  public async update(
    id: string,
    updateData: Partial<LeaveRequestDTO>
  ): Promise<ILeaveRequest | null> {
    const updatedRequest = await LeaveModel.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!updatedRequest) return null;
    if (
      updatedRequest.status === "Approved" ||
      updatedRequest.status === "Rejected"
    ) {
      const user = await userRepository.findById(String(updatedRequest.empId));
      console.log(user)
      if (user && user.email) {
        const subject = `Your Leave Request has been ${updateData.status}`;
        const text = `Hello ${
          user.firstName + user.lastName
        },\n\nYour leave request from ${updateData.startDate} to ${
          updateData.endDate
        } has been ${updateData.status}.\n\nRegards,\nHR Team`;

        await sendEmail(user.email, subject, text);
      }
    }
    return updatedRequest;
  }
}
export default new LeaveRequestRepository();
