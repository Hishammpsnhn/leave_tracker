import mongoose, { Schema, Document, Types } from "mongoose";

interface WorkingHours {
  start: string;
  end: string;
}

export interface Department extends Document {
  name: string;
  managerId: mongoose.Types.ObjectId;
  workingHours: WorkingHours;
  workingDays: string[];
  shift: "Morning" | "Evening" | "Night";
}

const workingHoursSchema = new Schema<WorkingHours>({
  start: { type: String, required: true },
  end: { type: String, required: true },
});

const departmentSchema = new Schema<Department>({
  name: { type: String, required: true },
  managerId: { type: Schema.Types.ObjectId, ref: "Employee" ,required:true},
  workingHours: { type: workingHoursSchema, required: true },
  workingDays: {
    type: [String],
    required: true,
    validate: {
      validator: function (v: string[]) {
        return v.length > 0;
      },
      message: "At least one working day is required",
    },
  },
  shift: {
    type: String,
    enum: ["Morning", "Evening", "Night"],
    required: true,
  },
});

const DepartmentModel = mongoose.model<Department>(
  "Department",
  departmentSchema
);

export default DepartmentModel;
