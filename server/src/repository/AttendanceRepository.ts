import AttendanceModel, {
  AttendanceDTO,
  IAttendance,
} from "../models/attendance";
import { startOfDay } from "date-fns";
import { convertUTCToLocalDateOnly } from "../utils/UtlToLocal";
import { UpdateResult } from "mongoose";

class AttendanceRepository {
  public async getAll(empId: string): Promise<IAttendance[]> {
    return AttendanceModel.find({ employeeId: empId }).limit(5);
  }
  public async findToday(empId: string): Promise<IAttendance | null> {
    const todayStart = startOfDay(new Date());
    const date = convertUTCToLocalDateOnly(String(todayStart));
    console.log(date);

    return AttendanceModel.findOne({
      employeeId: empId,
      date: date,
    });
  }

  public async create(
    attendanceDetails: AttendanceDTO<Partial<string>>
  ): Promise<IAttendance> {
    const { employeeId, date } = attendanceDetails;

    const attendance = await AttendanceModel.findOneAndUpdate(
      { employeeId, date },
      {
        $set: {
          ...attendanceDetails,
          updatedAt: new Date(),
        },
        $setOnInsert: {
          createdAt: new Date(),
        },
      },
      {
        new: true,
        upsert: true,
      }
    );

    return attendance;
  }
  public async update(
    attendanceDetails: AttendanceDTO<Partial<string>>
  ): Promise<IAttendance | null> {
    const { _id } = attendanceDetails;

    const attendance = await AttendanceModel.findByIdAndUpdate(
      { _id },
      {
        $set: {
          ...attendanceDetails,
          updatedAt: new Date(),
        },
        $setOnInsert: {
          createdAt: new Date(),
        },
      },
      {
        new: true,
      }
    );

    return attendance;
  }
  public async getForApproval(): Promise<IAttendance[]> {
    return AttendanceModel.find({
      isEdited: false,
      status: "Pending",
    });
  }
  public async updateMany(
    ids: string[],
    status: string,
    userId:string
  ):Promise<UpdateResult>  {
    return AttendanceModel.updateMany(
      { _id: { $in: ids }, status: "Pending" },
      { $set: { status,editApprovedBy:userId } },
    );
  }
}

export default new AttendanceRepository();
