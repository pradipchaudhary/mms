import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility to combine Tailwind CSS classes intelligently.
 * Accepts clsx-style inputs (strings, objects, arrays) and merges Tailwind classes.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(...inputs)); // spread inputs inside clsx
}