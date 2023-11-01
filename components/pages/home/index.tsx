/** @jsx jsx */
/** @jsxFrag Fragment */
import { jsx } from "hono/middleware.ts";
import { Header } from "@/components/parts/header.tsx";
import { Layout } from "@/components/layout.tsx";
import { Content } from "./content.tsx";

export const HomePage = () => (
  <Layout title="Home">
    <Header />
    <Content />
  </Layout>
);
