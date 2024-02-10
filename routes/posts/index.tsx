/** @jsx jsx */
/** @jsxFrag Fragment */
import { Hono, validator } from "hono/mod.ts";
import { jsx } from "hono/middleware.ts";
import { safeParse } from "valibot/mod.ts";
import { posts as postsKv } from "@/database/index.ts";
import { PostsPage } from "@/components/pages/posts/index.tsx";
import { createPayloadSchema, updatePayloadSchema } from "@/database/posts.ts";
import { PostContent } from "@/components/pages/posts/components/post-content.tsx";
import { PostEditForm } from "@/components/pages/posts/components/post-edit-form.tsx";

export const posts = new Hono();

posts.get("/", async (c) => {
  const posts = await postsKv.getAll();

  return c.html(<PostsPage posts={posts} />);
});

posts.get("/:id", async (c) => {
  const id = c.req.param("id");
  const result = await postsKv.get(id);

  if (!result) {
    return c.json({
      message: "Not found",
    }, 404);
  }

  return c.html(
    <PostContent
      id={result.id}
      title={result.title}
      post={result.post}
      name={result.name}
    />,
  );
});

posts.get("/:id/edit", async (c) => {
  const id = c.req.param("id");
  const result = await postsKv.get(id);

  if (!result) {
    return c.json({
      message: "Not found",
    }, 404);
  }

  return c.html(
    <PostEditForm
      id={id}
      title={result.title}
      post={result.post}
      name={result.name}
    />,
  );
});

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

    if (!result) {
      return c.body(null, 204);
    }

    return c.html(
      <PostContent
        id={result.id}
        title={result.title}
        post={result.post}
        name={result.name}
      />,
    );
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

    if (!result) {
      return c.json({
        message: "Not found",
      }, 404);
    }

    return c.html(
      <PostContent
        id={result.id}
        title={result.title}
        post={result.post}
        name={result.name}
      />,
    );
  },
);

posts.delete("/:id", async (c) => {
  const id = c.req.param("id");
  await postsKv.delete(id);

  return c.body(null, 200);
});
