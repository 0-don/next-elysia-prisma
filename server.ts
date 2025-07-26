import { createServer } from "http";
import next from "next";
import { parse } from "url";

process.env.TURBOPACK = "1";
const nodeEnv = process.env.NODE_ENV || "development";

const port = parseInt(process.env.PORT || "3000", 10);
const dev = nodeEnv !== "production";
const app = next({ dev, turbopack: true });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url!, true);
    handle(req, res, parsedUrl);
  }).listen(port);

  console.log(
    `> Server listening at http://localhost:${port} as ${
      dev ? "development" : nodeEnv
    }`
  );
});
