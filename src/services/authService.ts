import User, { User as UserType } from '../models/User';
import bcrypt from 'bcrypt';

export class AuthService {
  async register(userData: {
    name: string;
    email: string;
    password: string;
    time: number;
  }): Promise<UserType> {
    userData.time = Date.now();

    const hasedPassword = await bcrypt.hash(userData.password, 10);

    const user = new User({ ...userData, password: hasedPassword });

    return await user.save();
  }
}
