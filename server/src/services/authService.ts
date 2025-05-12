import bcrypt from "bcryptjs";
import { IUser } from "../models/employeesModel";
import userRepository from "../repository/userRepository";

class AuthService {
  public async authenticateUser(
    email: string,
    password: string
  ): Promise<IUser | null> {
    console.log(email);
    const user = await userRepository.findByEmail(email);
    console.log(user);
    if (!user) return null;

    const match = await bcrypt.compare(password, user.password);

    return match ? user : null;
  }
}

export default new AuthService();
