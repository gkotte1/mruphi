import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Join conditional classes, letting a passed-in class win over the default. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
