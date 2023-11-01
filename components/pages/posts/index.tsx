/** @jsx jsx */
/** @jsxFrag Fragment */
import { Fragment, jsx } from "hono/middleware.ts";
import { Layout } from "@/components/layout.tsx";
import { Post } from "@/models/post.ts";
import { Header } from "@/components/parts/header.tsx";
import { Content } from "./components/content.tsx";

export const PostsPage = ({ posts }: { posts: Array<Post> }) => {
  return (
    <Layout
      title="Posts"
      headContents={
        <Fragment>
          <script src="https://unpkg.com/htmx.org@1.9.6"></script>
          <script src="https://unpkg.com/hyperscript.org@0.9.12"></script>
        </Fragment>
      }
    >
      <Header />
      <Content posts={posts} />
    </Layout>
  );
};
