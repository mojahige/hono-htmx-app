/** @jsx jsx */
/** @jsxFrag Fragment */
import { jsx } from "hono/middleware.ts";
import { Post } from "@/models/post.ts";
import { PostCreateForm } from "./post-create-form.tsx";
import { PostContent } from "./post-content.tsx";

export const Content = ({ posts }: { posts: Array<Post> }) => (
  <main class="posts-content">
    <h1>Posts</h1>

    <PostCreateForm />

    <hr style="margin-block: 2rem;" />

    <div id="posts" class="posts">
      {posts.map((post) => {
        return (
          <PostContent
            id={post.id}
            title={post.title}
            post={post.post}
            name={post.name}
          />
        );
      })}
    </div>
  </main>
);
