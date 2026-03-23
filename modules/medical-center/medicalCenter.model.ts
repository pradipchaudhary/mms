// medicalCenter.model.ts
import mongoose, { Schema, models, model } from "mongoose";

const MedicalCenterSchema = new Schema(
  {
    medicalName: { type: String, required: true, trim: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true, lowercase: true },
    isActive: { type: Boolean, default: true },
    remark: {type: String, required:false}
  },
  { timestamps: true }
);

export const MedicalCenter =
  models.MedicalCenter || model("MedicalCenter", MedicalCenterSchema);