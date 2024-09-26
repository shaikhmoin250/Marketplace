import User, { User as UserType } from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config";

export class AuthService {
  async register(userData: {
    name: string;
    email: string;
    password: string;
  }): Promise<UserType> {
    const hasedPassword = await bcrypt.hash(userData.password, 10);

    const user = new User({ ...userData, password: hasedPassword });

    console.log('user', user);

    return await user.save();
  }

//   async login(email: string, password: string): Promise<string | null> {
//     const user = await User.findOne({ email });

//     if (!user) return null;

//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch) return null;

//     const token = jwt.sign({ id: user._id }, config.JWT_SECRET);

//     return token;
//   }
}
