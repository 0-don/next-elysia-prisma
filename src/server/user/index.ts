import { User } from "@/lib/generated/prisma/client";
import { AUTH_COOKIE } from "@/lib/utils/constants";
import { Elysia, InternalServerError } from "elysia";
import { cookies } from "next/headers";
import { decrypt } from "../../lib/jwt";

/**
 * User route for retrieving the current user's information.
 * Needs to be combined at the `app/api/[[...route]]/route.ts` file.
 * Represents RPC client types based on input & output.
 */
export const userRoute = new Elysia({
  prefix: "/user",
})
  .get("/me", async (ctx) => {
    const user = await decrypt<User>(
      (await cookies()).get(AUTH_COOKIE)?.value,
    );

    if (!user) throw new InternalServerError("User not found");

    return user;
  })
  .get(":id", async (ctx) => {
    const userId = ctx.params.id;

    return userId;
  });
