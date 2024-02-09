import { html } from "hono/middleware.ts";
import { Child, FC } from "hono/jsx/index.ts";

export const Layout: FC<{
  title?: string;
  headContents?: Child;
}> = ({
  title,
  headContents,
  children,
}) =>
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
