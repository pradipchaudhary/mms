import { MedicalCenter } from "./medicalCenter.model";
import { IMedicalCenter } from "./medicalCenter.types";

// CREATE
export const createMedicalCenter = async (data: IMedicalCenter) => {
  const exists = await MedicalCenter.findOne({ email: data.email });
  if (exists) throw new Error("Medical center already exists");

  return MedicalCenter.create(data);
};

// READ ALL
export const getMedicalCenters = async () => {
  return MedicalCenter.find().sort({ createdAt: -1 });
};

// READ SINGLE
export const getMedicalCenterById = async (id: string) => {
  const data = await MedicalCenter.findById(id);

  if (!data) {
    throw new Error("Medical center not found");
  }

  return data;
};

// UPDATE
export const updateMedicalCenter = async (
  id: string,
  data: Partial<IMedicalCenter>
) => {
  return MedicalCenter.findByIdAndUpdate(id, data, { new: true });
};

// DELETE
export const deleteMedicalCenter = async (id: string) => {
  return MedicalCenter.findByIdAndDelete(id);
};