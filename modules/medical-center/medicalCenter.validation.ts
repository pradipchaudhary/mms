// medicalCenter.validation.ts
import { z } from "zod";

export const medicalSchema = z.object({
  medicalName: z.string().min(3),
  address: z.string(),
  phone: z.string(),
  email: z.string().email(),
});