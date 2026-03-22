// auth.service.ts
import bcrypt from "bcryptjs";
import { User } from "../user/user.model";
import { generateToken } from "./auth.utils";

export const registerUser = async (data: any) => {
  const exists = await User.findOne({ email: data.email });

  if (exists) throw new Error("User already exists");

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const user = await User.create({
    ...data,
    password: hashedPassword,
  });

  return user;
};

export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ email }).select("+password");

  if (!user) throw new Error("Invalid credentials");

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) throw new Error("Invalid credentials");

  const token = generateToken({
    id: user._id,
    role: user.role,
  });

  return { user, token };
};