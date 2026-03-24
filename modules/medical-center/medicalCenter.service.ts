
"use server";

import { revalidatePath } from "next/cache";
import { connectDB } from "@/lib/db";
import { IMedicalCenter } from "./medicalCenter.types";
import { MedicalCenter } from "./medicalCenter.model";

// CREATE
export const createMedicalCenter = async (data: IMedicalCenter) => {
  await connectDB();

  const exists = await MedicalCenter.findOne({ email: data.email });

  if (exists) {
    throw new Error("Medical center already exists");
  }

  const result = await MedicalCenter.create(data);

  revalidatePath("/medical-centers");
  return result;
};

// GET ALL
export const getMedicalCenters = async () => {
  await connectDB();

  return MedicalCenter.find().sort({ createdAt: -1 }).lean();
};

// GET ONE
export const getMedicalCenterById = async (id: string) => {
  await connectDB();

  return MedicalCenter.findById(id).lean();
};

// DELETE
export const deleteMedicalCenter = async (id: string) => {
  await connectDB();

  await MedicalCenter.findByIdAndDelete(id);

  revalidatePath("/medical-centers");
};