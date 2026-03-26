import { Type as t } from "@sinclair/typebox/type";
import { Elysia } from "elysia";

export const demoRoute = new Elysia({
  prefix: "/demo",
})
  // 1. GET static - no params, no query, no body
  .get("/simple", () => "hello")

  // 2. GET static with query
  .get("/search", (ctx) => ({ results: [], page: ctx.query.page }), {
    query: t.Object({ page: t.String(), limit: t.Optional(t.String()) }),
  })

  // 3. GET with params only
  .get("/:id", (ctx) => ({ id: ctx.params.id }), {
    params: t.Object({ id: t.String() }),
  })

  // 4. GET with params + query
  .get("/:id/comments", (ctx) => ({ id: ctx.params.id, sort: ctx.query.sort }), {
    params: t.Object({ id: t.String() }),
    query: t.Object({ sort: t.String() }),
  })

  // 5. POST with body only (static route)
  .post("/create", (ctx) => ({ name: ctx.body.name }), {
    body: t.Object({ name: t.String(), email: t.String() }),
  })

  // 6. POST with body + query (static route)
  .post("/import", (ctx) => ({ format: ctx.query.format }), {
    body: t.Object({ data: t.String() }),
    query: t.Object({ format: t.String() }),
  })

  // 7. POST with params + body
  .post("/:id/update", (ctx) => ({ id: ctx.params.id, name: ctx.body.name }), {
    params: t.Object({ id: t.String() }),
    body: t.Object({ name: t.String() }),
  })

  // 8. POST with params + body + query (all three)
  .post("/:id/transfer", (ctx) => ({ id: ctx.params.id, to: ctx.body.to }), {
    params: t.Object({ id: t.String() }),
    body: t.Object({ to: t.String() }),
    query: t.Object({ notify: t.String() }),
  })

  // 9. DELETE with params only
  .delete("/:id", (ctx) => ({ deleted: ctx.params.id }), {
    params: t.Object({ id: t.String() }),
  });
