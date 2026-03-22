// modules/user/user.model.ts
import { Schema, model, models, Document, Model } from "mongoose";
import { UserRole } from "./user.types";

/**
 * IUser - TypeScript interface for User document
 */
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * UserSchema - Mongoose schema for User
 */
const UserSchema = new Schema<IUser>(
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
  { timestamps: true } // automatically adds createdAt & updatedAt
);

/**
 * Prevent model overwrite in Next.js hot reload (Vercel-safe)
 */
export const User: Model<IUser> =
  (models.User as unknown as Model<IUser>) || model<IUser>("User", UserSchema);