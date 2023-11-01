import { Hono } from "hono/mod.ts";
import { posts } from "./posts/index.ts";

export const api = new Hono();

api.route("/posts", posts);
