import { assert, assertArrayIncludes, assertObjectMatch } from "assert/mod.ts";
import { FakeTime } from "testing/time.ts";
import Posts from "@/database/posts.ts";
import { Post } from "@/models/post.ts";

Deno.test("posts", async (t) => {
  const kv = await Deno.openKv(":memory:");
  const posts = new Posts(kv);
  const time = new FakeTime("2023-10-10T00:00:00.000Z");
  let testId: string;

  // Test data
  await posts.create({
    title: "Deno!",
    post: "Hello Deno!",
    name: "Deno",
  });

  time.tick(60 * 100);

  await posts.create({
    title: "Hono!",
    post: "Hello Hono!",
    name: "Hono",
  });

  time.restore();

  await t.step("create", async () => {
    const time = new FakeTime("2023-10-15T00:00:00.000Z");
    const post = await posts.create({
      title: "Foo!",
      post: "Foo Foo!",
      name: "Foo",
    });

    if (post == null) {
      time.restore();
      kv.close();

      throw new Error("failed posts.create");
    }

    testId = post.id;

    assert(post.id);
    assertObjectMatch(
      post,
      {
        title: "Foo!",
        post: "Foo Foo!",
        name: "Foo",
        createdAt: "2023-10-15T00:00:00.000Z",
        updatedAt: "2023-10-15T00:00:00.000Z",
      } satisfies Omit<Post, "id">,
    );

    time.restore();
  });

  await t.step("get", async () => {
    const post = await posts.get(testId);

    if (post == null) {
      kv.close();

      throw new Error("failed posts.find");
    }

    assertObjectMatch(
      post,
      {
        title: "Foo!",
        post: "Foo Foo!",
        name: "Foo",
        createdAt: "2023-10-15T00:00:00.000Z",
        updatedAt: "2023-10-15T00:00:00.000Z",
      } satisfies Omit<Post, "id">,
    );
  });

  await t.step("getAll", async () => {
    const items = await posts.getAll();

    assert(items.length === 3);
    assertArrayIncludes(items.map(({ name }) => name), ["Deno", "Hono", "Foo"]);
  });

  await t.step("update", async () => {
    const time = new FakeTime("2023-10-16T00:00:00.000Z");
    const post = await posts.update(testId, { title: "Bar!", name: "Bar" });

    if (post == null) {
      time.restore();
      kv.close();

      throw new Error("failed posts.update");
    }

    assertObjectMatch(
      post,
      {
        title: "Bar!",
        post: "Foo Foo!",
        name: "Bar",
        createdAt: "2023-10-15T00:00:00.000Z",
        updatedAt: "2023-10-16T00:00:00.000Z",
      } satisfies Omit<Post, "id">,
    );

    time.restore();
  });

  await t.step("delete", async () => {
    await posts.delete(testId);

    const post = await posts.get(testId);

    assert(post === null);
  });

  kv.close();
});
