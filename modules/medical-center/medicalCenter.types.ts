// modules/medical-center/types/medicalCenter.types.ts

export interface IMedicalCenter {
  _id?: string;
  medicalName: string;
  address: string;
  phone: string;
  email: string;
  isActive?: boolean;
  remark?: string;
}