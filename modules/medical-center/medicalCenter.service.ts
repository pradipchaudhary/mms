import { MedicalCenter } from "./medicalCenter.model";
import { IMedicalCenter } from "./medicalCenter.types";

export const createMedicalCenter = async (data: IMedicalCenter) => {
  const exists = await MedicalCenter.findOne({ email: data.email });
  if (exists) throw new Error("Medical center already exists");
  return MedicalCenter.create(data);
};

export const getMedicalCenters = async () => {
  return MedicalCenter.find().sort({ createdAt: -1 });
};

export const getMedicalCenterById = async (id: string) => {
  return MedicalCenter.findById(id);
};

export const deleteMedicalCenter = async (id: string) => {
  return MedicalCenter.findByIdAndDelete(id);
};