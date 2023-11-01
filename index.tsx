/** @jsx jsx */
/** @jsxFrag Fragment */
import { Hono } from "hono/mod.ts";
import { jsx, prettyJSON, serveStatic } from "hono/middleware.ts";
import { api } from "@/api/index.ts";
import { HomePage } from "@/components/pages/home/index.tsx";
import { posts } from "@/routes/posts/index.tsx";

const app = new Hono();

app.use("*", prettyJSON());
app.use("/static/*", serveStatic({ root: "./" }));

// TODO: Remove unused route
app.route("/api", api);

app.get("/", (c) => c.html(<HomePage />));
app.route("/posts", posts);

Deno.serve({ port: 8888 }, app.fetch);
