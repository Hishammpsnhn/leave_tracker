import { UpdateResult } from "mongoose";
import { AttendanceDTO, IAttendance } from "../models/attendance";
import AttendanceRepository from "../repository/AttendanceRepository";
import userRepository from "../repository/userRepository";
import deptRepository from "../repository/deptRepository";

class AttendanceService {
  public async createAttendance(
    attendanceDetails: AttendanceDTO<Partial<string>>
  ): Promise<IAttendance | null> {
    console.log(attendanceDetails);
    const user = await userRepository.findById(attendanceDetails.employeeId);
    if (!user) {
      return null;
    }

    const attendance = await AttendanceRepository.create({
      ...attendanceDetails,
      departmentId: user.deptId,
    });
    if (!attendance) return null;
    return attendance;
  }

  public async getAllAttendance(empId: string): Promise<IAttendance[] | null> {
    const attendance = await AttendanceRepository.getAll(empId);
    if (!attendance) return null;

    return attendance;
  }
  public async getAttendanceForApproval(
    managerId: string
  ): Promise<IAttendance[] | null> {
    const manager = await userRepository.findById(managerId);
    console.log(managerId, manager);
    if (!manager) {
      return null;
    }
    const dept = await deptRepository.getAllByManager(manager.id);
    if (!dept) {
      return null;
    }
    const attendance = await AttendanceRepository.getForApproval(
      dept.id
    );
    if (!attendance) return null;

    return attendance;
  }
  public async getTodayAttendance(empId: string): Promise<IAttendance | null> {
    const attendance = await AttendanceRepository.findToday(empId);
    if (!attendance) return null;
    return attendance;
  }
  public async updateAttendance(
    attendanceDetails: AttendanceDTO<Partial<string>>
  ): Promise<IAttendance | null> {
    const attendance = await AttendanceRepository.update(attendanceDetails);
    if (!attendance) return null;
    return attendance;
  }
  public async BulkUpdateAttendance(
    ids: string[],
    status: string,
    userId: string
  ): Promise<UpdateResult | null> {
    const attendance = await AttendanceRepository.updateMany(
      ids,
      status,
      userId
    );
    if (!attendance) return null;
    return attendance;
  }
}

export default new AttendanceService();
