/// <reference lib="deno.unstable" />

import Posts from "./posts.ts";

const kv = await Deno.openKv(":memory:");

export const posts = new Posts(kv);
