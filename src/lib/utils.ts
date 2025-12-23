import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function decodeJWT(token: string): { header: Record<string, unknown>; payload: Record<string, unknown>; signature: string } | null {
  try {
    const parts = token.split('.')
    if (parts.length !== 3) return null

    const decode = (str: string): Record<string, unknown> => {
      try {
        return JSON.parse(atob(str.replace(/-/g, '+').replace(/_/g, '/')))
      } catch {
        return {}
      }
    }

    return {
      header: decode(parts[0]),
      payload: decode(parts[1]),
      signature: parts[2]
    }
  } catch {
    return null
  }
}

export function encodeBase64(obj: Record<string, unknown>): string {
  return btoa(JSON.stringify(obj))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '')
}
