import { html } from "hono/helper.ts";
import type { Child, PropsWithChildren } from "hono/middleware.ts";

export const Layout = ({
  title,
  headContents,
  children,
}: PropsWithChildren<{
  title?: string;
  headContents?: Child;
}>) =>
  html`
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>${title ?? "🔥 🦕"}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/static/stylesheets/index.css">
    ${headContents}
  </head>
  <body>
    ${children}
  </body>
</html>
`;
