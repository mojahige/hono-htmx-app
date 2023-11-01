/** @jsx jsx */
/** @jsxFrag Fragment */
import { jsx } from "hono/middleware.ts";

export const PostEditForm = ({
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
  const postContentId = `post-content-${id}`;

  return (
    <form
      class="post-edit-form"
      hx-put={`/posts/${id}`}
      hx-target="this"
      hx-swap="outerHTML"
      tabIndex="-1"
      autofocus
    >
      <div class="controls">
        <div class="control">
          <span>
            <label for={`${postContentId}-title`}>
              Title
            </label>
          </span>

          <input
            id={`${postContentId}-title`}
            type="text"
            name="title"
            value={title}
            required
          />
        </div>

        <div class="control">
          <span>
            <label for={`${postContentId}-content`}>
              Post
            </label>
          </span>

          <textarea id={`${postContentId}-content`} name="post" required>
            {post}
          </textarea>
        </div>

        <div class="control">
          <span>
            <label for={`${postContentId}-name`}>
              Name
            </label>
          </span>

          <input
            id={`${postContentId}-name`}
            type="text"
            name="name"
            value={name}
            required
          />
        </div>
      </div>

      <div class="button-group">
        <button
          class="button  -sm"
          hx-get={`/posts/${id}`}
        >
          Cancel
        </button>

        <button class="button -blue -sm">
          Update
        </button>
      </div>
    </form>
  );
};
