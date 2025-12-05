import prisma from "@/lib/prisma";
import { authenticationSchema } from "@/lib/typebox/auth";
import { AUTH_COOKIE, SEVEN_DAYS } from "@/lib/utils/constants";
import { Elysia, InternalServerError } from "elysia";
import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";
import { encrypt } from "../../lib/jwt";

/**
 * Authentication routes for user registration, login, and logout.
 * Needs to be combined at the `app/api/[[...route]]/route.ts` file with
 * Represents RPC client types based on input & output
 */
export const authRoute = new Elysia({
  prefix: "/auth",
})
  .post(
    "/register",
    async (ctx) => {
      // Check if user already exists
      const userExist = await prisma.user.findFirst({
        where: { username: ctx.body.username.trim() },
      });
      if (userExist) throw new InternalServerError("User already exists");

      // Create new user
      const user = await prisma.user.create({
        data: {
          username: ctx.body.username.trim(), // typesafe ctx.body based on `authUser` schema
          password: ctx.body.password.trim(), // typesafe ctx.body based on `authUser` schema
        },
      });

      const cookie: ResponseCookie = {
        name: AUTH_COOKIE,
        value: (await encrypt(user))!,
        path: "/",
        httpOnly: true,
        maxAge: SEVEN_DAYS,
      };
      // Set authentication cookie
      (await cookies()).set(cookie);
    },
    { body: authenticationSchema }, // Use authUser schema for request body validation
  )
  .post(
    "/login",
    async (ctx) => {
      // Find user by username and password
      const user = await prisma.user.findFirst({
        where: {
          username: ctx.body.username.trim(), // typesafe ctx.body based on `authUser` schema
          password: ctx.body.password.trim(), // typesafe ctx.body based on `authUser` schema
        },
      });

      if (!user) throw new InternalServerError("User not found");

      const cookie: ResponseCookie = {
        name: AUTH_COOKIE,
        value: (await encrypt(user))!,
        path: "/",
        httpOnly: true,
        maxAge: SEVEN_DAYS,
      };
      // Set authentication cookie
      (await cookies()).set(cookie);
    },
    { body: authenticationSchema }, // Use authUser schema for request body validation
  )
  .get("/logout", async (ctx) => {
    // Clear authentication cookie
    (await cookies()).delete(AUTH_COOKIE);
  });
