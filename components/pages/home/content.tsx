/** @jsx jsx */
/** @jsxFrag Fragment */
import { jsx } from "hono/middleware.ts";

export const Content = () => (
  <main class="home-content">
    <h1>Home</h1>

    <p>This is a test app using Hono and htmx.</p>
    <ul>
      <li>
        <a href="https://hono.dev/">Hono</a>
      </li>
      <li>
        <a href="https://htmx.org/">htmx</a>
      </li>
    </ul>
  </main>
);
