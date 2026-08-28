import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatKzPhone(value: string): string {
  let digits = value.replace(/\D/g, '');
  if (!digits) return '';

  if (digits[0] === '8') digits = '7' + digits.slice(1);
  if (digits[0] !== '7') digits = '7' + digits;

  let result = '+7';
  if (digits.length > 1) result += ' (' + digits.substring(1, 4);
  if (digits.length >= 5) result += ') ' + digits.substring(4, 7);
  if (digits.length >= 8) result += '-' + digits.substring(7, 9);
  if (digits.length >= 10) result += '-' + digits.substring(9, 11);

  return result;
}
