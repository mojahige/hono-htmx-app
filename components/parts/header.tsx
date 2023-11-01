/** @jsx jsx */
/** @jsxFrag Fragment */
import { jsx } from "hono/middleware.ts";

export const Header = () => (
  <header class="header">
    <h1>hono-htmx-app</h1>

    <nav>
      <ul>
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/posts">Posts</a>
        </li>
      </ul>
    </nav>
  </header>
);
