import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { UserRole } from "../constants/userRoles";
dotenv.config();
type Role = UserRole.MANAGER | UserRole.EMPLOYEE | UserRole.ADMIN;
const secret = process.env.JWT_SECRET;
if (!secret) {
  throw new Error("secret key missing");
}

export const generateToken = (userId: number, role: Role): string => {
  return jwt.sign({ userId, role }, secret, { expiresIn: "1d" });
};
