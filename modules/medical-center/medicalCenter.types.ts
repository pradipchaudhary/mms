// medicalCenter.types.ts
export interface IMedicalCenter {
  medicalName: string;
  address: string;
  phone: string;
  email: string;
  isActive?: boolean;
  remark?:string;
}