import mongoose, { Document, Schema, Model } from "mongoose";

export interface LeaveRequestDTO<T = any> {
  empId: string; 
  deptId?: mongoose.Types.ObjectId;
  leaveType?:
    | "annual"
    | "sick"
    | "personal"
    | "maternity"
    | "bereavement"
    | "unpaid";
  startDate?: T;
  endDate?: T;
  reason?: T;
  contactInfo?: T;
  createdAt?: T;
  status?: "Pending" | "Approved" | "Rejected";
  _id?: T;
}

export interface ILeaveRequest extends Document {
  leaveType:
    | "annual"
    | "sick"
    | "personal"
    | "maternity"
    | "bereavement"
    | "unpaid";
  startDate: Date;
  endDate: Date;
  reason: string;
  contactInfo: string;
  createdAt?: Date;
  status: "Pending" | "Approved" | "Rejected";
  empId: mongoose.Types.ObjectId;
  deptId: mongoose.Types.ObjectId;
}

const leaveSchema: Schema<ILeaveRequest> = new Schema({
  leaveType: {
    type: String,
    required: true,
    enum: ["annual", "sick", "personal", "maternity", "bereavement", "unpaid"],
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  reason: {
    type: String,
    required: true,
    maxlength: 500,
  },
  contactInfo: {
    type: String,
    required: true,
    maxlength: 255,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending",
  },
  empId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
  deptId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
});

const LeaveRequest: Model<ILeaveRequest> = mongoose.model<ILeaveRequest>(
  "LeaveRequest",
  leaveSchema
);

export default LeaveRequest;
