export interface ICompany {
  _id?: string; // MongoDB ObjectId
  name: string;
  address?: string;
  email: string;
  phone?: string;
  isActive?: boolean;
  remark?: string;
}