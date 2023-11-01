import { Hono, validator } from "hono/mod.ts";
import { safeParse } from "valibot/mod.ts";
import { posts as postsKv } from "@/database/index.ts";
import { createPayloadSchema, updatePayloadSchema } from "@/database/posts.ts";

export const posts = new Hono();

posts.get("/", async (c) => {
  const result = await postsKv.getAll();

  return c.json(result);
});

posts.get(
  "/:id",
  async (c) => {
    const id = c.req.param("id");
    const result = await postsKv.get(id);

    return c.json(result);
  },
);

posts.post(
  "/",
  validator("form", (payload, c) => {
    const parseResult = safeParse(createPayloadSchema, payload);

    if (!parseResult.success) {
      return c.json({
        message: "Invalid payload",
      }, 400);
    }

    return parseResult.output;
  }),
  async (c) => {
    const result = await postsKv.create(c.req.valid("form"));

    return c.json(result);
  },
);

posts.put(
  "/:id",
  validator("form", (payload, c) => {
    const parseResult = safeParse(updatePayloadSchema, payload);

    if (!parseResult.success) {
      return c.json({
        message: "Invalid payload",
      }, 400);
    }

    return parseResult.output;
  }),
  async (c) => {
    const id = c.req.param("id");
    const result = await postsKv.update(id, c.req.valid("form"));

    return c.json(result);
  },
);

posts.delete("/:id", async (c) => {
  const id = c.req.param("id");
  await postsKv.delete(id);

  return c.json({
    message: "Deleted",
  });
});
