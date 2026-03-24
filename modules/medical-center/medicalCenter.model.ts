import mongoose, { Schema, models } from "mongoose";
import { IMedicalCenter } from "./medicalCenter.types";

const MedicalSchema = new Schema<IMedicalCenter>(
  {
    medicalName: { type: String, required: true, trim: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    isActive: { type: Boolean, default: true },
    remark: String,
  },
  { timestamps: true }
);

export const MedicalCenter =
  models.MedicalCenter || mongoose.model<IMedicalCenter>("MedicalCenter", MedicalSchema);