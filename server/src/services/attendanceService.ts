import { UpdateResult } from "mongoose";
import { AttendanceDTO, IAttendance } from "../models/attendance";
import AttendanceRepository from "../repository/AttendanceRepository";

class AttendanceService {
  public async createAttendance(
    attendanceDetails: AttendanceDTO<Partial<string>>
  ): Promise<IAttendance | null> {
    console.log(attendanceDetails)
    const attendance = await AttendanceRepository.create(attendanceDetails);
    if (!attendance) return null;
    return attendance;
  }

  public async getAllAttendance(empId: string): Promise<IAttendance[] | null> {
    const attendance = await AttendanceRepository.getAll(empId);
    if (!attendance) return null;

    return attendance;
  }
  public async getAttendanceForApproval(): Promise<IAttendance[] | null> {
    const attendance = await AttendanceRepository.getForApproval();
    if (!attendance) return null;

    return attendance;
  }
  public async getTodayAttendance(empId: string): Promise<IAttendance | null> {
    const attendance = await AttendanceRepository.findToday(empId);
    if (!attendance) return null;
    return attendance;
  }
  public async updateAttendance(attendanceDetails:  AttendanceDTO<Partial<string>>): Promise<IAttendance | null> {
    const attendance = await AttendanceRepository.update(attendanceDetails);
    if (!attendance) return null;
    return attendance;
  }
  public async BulkUpdateAttendance(ids:string[],status:string,userId:string): Promise<UpdateResult|null> {
    const attendance = await AttendanceRepository.updateMany(ids,status,userId);
    if (!attendance) return null;
    return attendance;
  }
}

export default new AttendanceService();
