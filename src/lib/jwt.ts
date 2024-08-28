import { serverEnv } from "@/utils/env/server";
import * as jose from "jose";

// Create an encryption key from the server's SECRET environment variable
const key = new TextEncoder().encode(serverEnv.SECRET);

/**
 * Encrypts a value using JSON Web Encryption (JWE)
 * @param value - The value to encrypt (can be any type)
 * @returns A Promise that resolves to the encrypted string, or null if encryption fails
 */
export const encrypt = async (value: any): Promise<string | null> => {
  try {
    // Convert objects to JSON strings, leave other types as-is
    const text = typeof value === "object" ? JSON.stringify(value) : value;

    // Create a JWE using direct encryption with AES-GCM
    const jwe = await new jose.CompactEncrypt(new TextEncoder().encode(text))
      .setProtectedHeader({ alg: "dir", enc: "A256GCM" })
      .encrypt(key);

    return jwe;
  } catch (error) {
    return null;
  }
};

/**
 * Decrypts a JWE string
 * @param encryptedText - The JWE string to decrypt
 * @returns A Promise that resolves to the decrypted value (as type T), or null if decryption fails
 */
export const decrypt = async <T = string>(
  encryptedText?: string,
): Promise<T | null> => {
  if (typeof encryptedText !== "string") return null;
  try {
    // Decrypt the JWE string
    const { plaintext } = await jose.compactDecrypt(encryptedText, key);
    const decrypted = new TextDecoder().decode(plaintext);

    // Attempt to parse the decrypted text as JSON
    try {
      return JSON.parse(decrypted) as T;
    } catch (error) {
      // If parsing fails, return the decrypted text as-is
      return decrypted as T;
    }
  } catch (error) {
    return null;
  }
};
