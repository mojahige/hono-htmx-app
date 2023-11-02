/** @jsx jsx */
/** @jsxFrag Fragment */
import { Hono } from "hono/mod.ts";
import { jsx, prettyJSON, serveStatic } from "hono/middleware.ts";
import { HomePage } from "@/components/pages/home/index.tsx";
import { posts } from "@/routes/posts/index.tsx";

const app = new Hono();

app.use("*", prettyJSON());
app.use("/static/*", serveStatic({ root: "./" }));

app.get("/", (c) => c.html(<HomePage />));
app.route("/posts", posts);

Deno.serve({ port: 8888 }, app.fetch);
