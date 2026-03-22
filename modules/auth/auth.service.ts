/**
 * Auth Service
 * ------------
 * - Handles user registration and login
 * - Uses bcrypt for hashing
 * - Generates JWT token
 */

import bcrypt from "bcryptjs";
import { User, IUser } from "../user/user.model";
import { generateToken } from "./auth.utils";
import { UserRole } from "../user/user.types";

/**
 * Input type for registration
 */
interface RegisterInput {
  name: string;
  email: string;
  password: string;
  role?: UserRole;
}

/**
 * Register a new user
 */
export const registerUser = async (data: RegisterInput): Promise<IUser> => {
  const exists = await User.findOne({ email: data.email });

  if (exists) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const user = await User.create({
    ...data,
    password: hashedPassword,
  });

  return user;
};

/**
 * Login user
 */
export const loginUser = async (
  email: string,
  password: string
): Promise<{ user: IUser; token: string }> => {
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const token = generateToken({
    id: user._id.toString(),
    role: user.role,
  });

  return { user, token };
};