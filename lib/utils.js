import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// This is safe to use anywhere (client/server)
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
