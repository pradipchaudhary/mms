/**
 * Role Authorization Middleware
 * -----------------------------
 * - Ensures user has one of the allowed roles
 * - Depends on getAuthUser()
 * - Throws error if unauthorized
 */

import { getAuthUser } from "./auth.middleware";
import { UserRole } from "@/modules/user/user.types";

/**
 * Auth payload shape (should match JWT payload)
 */
interface AuthPayload {
  id: string;
  role: UserRole;
}

/**
 * Authorize user roles
 * @param roles Allowed roles
 */
export const authorizeRoles = (...roles: UserRole[]) => {
  return async (): Promise<AuthPayload> => {
    const user = (await getAuthUser()) as AuthPayload | null;

    // Check authentication
    if (!user) {
      throw new Error("Unauthorized");
    }

    // Check role authorization
    if (!roles.includes(user.role)) {
      throw new Error("Forbidden");
    }

    return user;
  };
};