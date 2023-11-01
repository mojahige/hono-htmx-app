import { object, type Output, string } from "valibot/mod.ts";

export const schema = object({
  id: string(),
  name: string(),
  title: string(),
  post: string(),
  createdAt: string(),
  updatedAt: string(),
});

export type Post = Output<typeof schema>;
