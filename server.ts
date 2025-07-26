import "dotenv/config";

import node from "@/lib/node";
import { authRoute } from "@/server/auth";
import { cors } from "@elysiajs/cors";
import "dotenv/config";
import { Elysia, ElysiaAdapter } from "elysia";
import { createServer } from "http";
import next from "next";
import { parse } from "url";
import { userRoute } from "./src/server/user";

const port = parseInt(process.env.PORT || "3000", 10);
const dev = process.env.NODE_ENV !== "production";

// Next.js app
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

// Elysia API app
export const app = new Elysia({ adapter: node() as ElysiaAdapter })
  .use(cors({ origin: true, credentials: true }))
  .group("/api", (app) => app.use(authRoute).use(userRoute));

nextApp.prepare().then(() => {
  createServer(async (req, res) => {
    const parsedUrl = parse(req.url!, true);

    // Handle API routes with Elysia
    if (req.url?.startsWith("/api/")) {
      const request = new Request(`http://localhost${req.url}`, {
        method: req.method,
        headers: req.headers as any,
        body:
          req.method !== "GET" && req.method !== "HEAD"
            ? await new Promise((resolve) => {
                let body = "";
                req.on("data", (chunk) => (body += chunk));
                req.on("end", () => resolve(body));
              })
            : undefined,
      });

      const response = await app.fetch(request);

      res.statusCode = response.status;
      response.headers.forEach((value, key) => {
        res.setHeader(key, value);
      });

      const body = await response.text();
      res.end(body);
      return;
    }

    // Handle everything else with Next.js
    handle(req, res, parsedUrl);
  }).listen(port);

  console.log(
    `🦊 Server listening at http://localhost:${port} as ${dev ? "development" : "production"}`,
  );
});

export type App = typeof app;
