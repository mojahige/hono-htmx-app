/** @jsx jsx */
/** @jsxFrag Fragment */
import { jsx } from "hono/middleware.ts";

export const PostCreateForm = () => {
  return (
    <form
      class="post-create-form"
      hx-post="/posts"
      hx-target="#posts"
      hx-swap="beforeend"
      _="on htmx:afterOnLoad my.reset()"
    >
      <div class="controls">
        <div class="control">
          <span>
            <label for="post-title">
              Title
            </label>
          </span>

          <input id="post-title" type="text" name="title" required />
        </div>

        <div class="control">
          <span>
            <label for="post-content">
              Post
            </label>
          </span>

          <textarea id="post-content" name="post" required />
        </div>

        <div class="control">
          <span>
            <label for="post-author-name">
              Name
            </label>
          </span>

          <input id="post-author-name" type="text" name="name" required />
        </div>
      </div>

      <div class="button-group">
        <button class="button -blue">
          Create
        </button>
      </div>
    </form>
  );
};
