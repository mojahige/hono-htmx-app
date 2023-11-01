/** @jsx jsx */
/** @jsxFrag Fragment */
import { jsx } from "hono/middleware.ts";

export const PostContent = ({
  id,
  title,
  post,
  name,
}: {
  id: string;
  title: string;
  post: string;
  name: string;
}) => {
  return (
    <article
      class="post-content"
      hx-target="this"
      hx-swap="outerHTML"
      tabIndex="-1"
      autofocus
    >
      <div class="contents">
        <div class="content">
          <h2>Title</h2>
          <p>{title}</p>
        </div>

        <div class="content">
          <h3>Post</h3>
          <pre>{post}</pre>
        </div>

        <div class="content">
          <h3>Name</h3>
          <p>{name}</p>
        </div>
      </div>

      <div class="button-group">
        <button
          class="button -red -sm"
          hx-delete={`/posts/${id}`}
          hx-confirm="Are you Do you really want to delete it?"
        >
          Delete
        </button>

        <button
          class="button -sm"
          hx-get={`/posts/${id}/edit`}
        >
          Edit
        </button>
      </div>
    </article>
  );
};
