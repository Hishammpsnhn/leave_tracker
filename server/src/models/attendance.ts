import mongoose, { Document, Schema, Model, ObjectId } from "mongoose";
export interface AttendanceDTO<T> {
  employeeId: string;
  departmentId?: mongoose.Types.ObjectId;
  date?: string;
  loginTime?: T;
  logoutTime?: T;
  isLate?: T;
  reason?: T;
  isEdited?: T;
  editRequestedBy?: T;
  editApprovedBy?: T;
  status?: T;
  _id?: T;
}

export interface IAttendance extends Document {
  employeeId: mongoose.Types.ObjectId;
  departmentId: mongoose.Types.ObjectId;
  date: string;
  loginTime: string;
  logoutTime?: string;
  isLate: boolean;
  reason?: string;
  isEdited: boolean;
  editRequestedBy?: mongoose.Types.ObjectId;
  editApprovedBy?: mongoose.Types.ObjectId;
  status: "Pending" | "Approved" | "Rejected";
  createdAt: Date;
  updatedAt: Date;
}

const AttendanceSchema = new Schema<IAttendance>(
  {
    employeeId: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    departmentId: {
      type: Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    loginTime: {
      type: String,
      required: true,
    },
    logoutTime: {
      type: String,
      default: null,
    },
    isLate: {
      type: Boolean,
      default: false,
    },
    reason: {
      type: String,
      default: null,
    },
    isEdited: {
      type: Boolean,
      default: false,
    },
    editRequestedBy: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
      default: null,
    },
    editApprovedBy: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
      default: null,
    },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

const Attendance: Model<IAttendance> = mongoose.model<IAttendance>(
  "Attendance",
  AttendanceSchema
);

export default Attendance;
