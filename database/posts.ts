import { type Output, partial, pick } from "valibot/mod.ts";
import { Post, schema } from "@/models/post.ts";

export const createPayloadSchema = pick(schema, ["name", "title", "post"]);
export const updatePayloadSchema = partial(
  pick(schema, ["name", "title", "post"]),
);

export type CreatePayload = Output<typeof createPayloadSchema>;
export type UpdatePayload = Output<typeof updatePayloadSchema>;

export default class {
  private kv: Deno.Kv;
  private key = "posts";

  constructor(kv: Deno.Kv) {
    this.kv = kv;
  }

  async create(payload: CreatePayload) {
    const id = crypto.randomUUID();
    const date = new Date().toISOString();

    await this.kv.set(
      [this.key, id],
      {
        ...payload,
        id,
        createdAt: date,
        updatedAt: date,
      } satisfies Post,
    );

    return this.get(id);
  }

  async get(id: string) {
    const { value } = await this.kv.get<Post>([this.key, id]);

    return value;
  }

  async getAll() {
    const posts = [];
    const results = this.kv.list<Post>({ prefix: [this.key] });

    for await (const result of results) {
      posts.push(result.value);
    }

    return posts;
  }

  async update(id: string, payload: Partial<UpdatePayload>) {
    const post = await this.get(id);

    // 😕
    if (post == null) {
      return null;
    }

    await this.kv.set(
      [this.key, id],
      {
        ...post,
        ...payload,
        updatedAt: new Date().toISOString(),
      } satisfies Post,
    );

    return this.get(id);
  }

  delete(id: string) {
    return this.kv.delete([this.key, id]);
  }
}
