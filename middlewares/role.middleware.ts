// middlewares/role.middleware.ts
import { getAuthUser } from "./auth.middleware";

export const authorizeRoles = (...roles: string[]) => {
  return async () => {
    const user = await getAuthUser();

    if (!roles.includes((user as any).role)) {
      throw new Error("Forbidden");
    }

    return user;
  };
};