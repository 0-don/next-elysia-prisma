import { encrypt } from "@/lib/jwt";
import prisma from "@/lib/prisma";
import { authUser } from "@/lib/typebox/auth";
import { serverEnv } from "@/utils/env/server";
import { Elysia, InternalServerError } from "elysia";
import { cookies } from "next/headers";

/**
 * Authentication routes for user registration, login, and logout.
 * Needs to be combined at the `app/api/[[...route]]/route.ts` file with
 * Represents RPC client types based on input & output
 */
export const authRoute = new Elysia({ prefix: "/auth" })
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

      // Set authentication cookie
      cookies().set({
        name: serverEnv.AUTH_COOKIE,
        value: (await encrypt(user))!,
        path: "/",
        httpOnly: true,
        maxAge: serverEnv.SEVEN_DAYS,
      });

      return "success";
    },
    { body: authUser }, // Use authUser schema for request body validation
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

      cookies().set({
        name: serverEnv.AUTH_COOKIE,
        value: (await encrypt(user))!,
        path: "/",
        httpOnly: true,
        maxAge: serverEnv.SEVEN_DAYS,
      });

      return "success";
    },
    { body: authUser }, // Use authUser schema for request body validation
  )
  .get("/logout", (ctx) => {
    // Clear authentication cookie
    return !!cookies().delete(serverEnv.AUTH_COOKIE);
  });
