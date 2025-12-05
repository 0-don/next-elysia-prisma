// Note: bug in nodejs cant import serverEnv into middleware.ts
export const SERVER_URL_KEY = "x-url";

// Environment variables
export const DATABASE_URL = process.env.DATABASE_URL!;
export const SECRET = process.env.SECRET!;
export const NODE_ENV = process.env.NODE_ENV as "development" | "test" | "production";
export const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_URL!;

// Constants
export const AUTH_COOKIE = "auth";
export const SEVEN_DAYS = 60 * 60 * 24 * 7; // 7 days in seconds
