// user.model.ts
import mongoose, { Schema, model, models } from "mongoose";
import { UserRole } from "./user.types";

const UserSchema = new Schema(
  {
    name: { type: String, required: true },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
      select: false, // 🔐 never return password
    },

    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.RECEPTION,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export const User = models.User || model("User", UserSchema);