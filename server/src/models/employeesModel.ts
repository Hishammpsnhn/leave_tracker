import mongoose, { Document, Schema, Types } from "mongoose";
import bcrypt from "bcrypt";
import { UserRole } from "../constants/userRoles";

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  joiningDate: Date;
  role: UserRole;
  managerId?: string;
  salary: number;
}

const EmpModel: Schema = new Schema<IUser>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  joiningDate: { type: Date, required: true },
  managerId: { type: String, ref: "Employee", default: null },
  role: { type: String, enum: ["admin", "emp", "manager"], required: true },
  salary: { type: Number, required: true },
});

EmpModel.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const user = this as unknown as IUser;
    user.password = await bcrypt.hash(user.password, salt);
    next();
  } catch (err: any) {
    next(err);
  }
});

const EmployeeModel = mongoose.model<IUser>("Employee", EmpModel);

export default EmployeeModel;
