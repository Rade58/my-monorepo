import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

// import { prisma } from "~/db.server";

import { getPostSlugsAndTitles } from "~/models/post.server";
import { useOptionalAdminUser } from "~/utils";
/* interface PostI {
  slug: string;
  title: string;
}
 */

async function getPosts() {
  const posts = await getPostSlugsAndTitles();

  /* const normalizedPosts = posts.map((post) => {
    return {
      ...post,
      // createdAt: post.createdAt.toISOString(),
      // updatedAt: post.updatedAt.toISOString(),
    };
  }); */

  return {
    posts /* : normalizedPosts, */,
  };
}

export function ErrorBoundary(error: Error) {
  console.log(error);
  return (
    <div className="text-rose-300">
      Unexpected Error Occured: {error.message}
    </div>
  );
}

export const loader /* : LoaderFunction */ = async (argums: LoaderArgs) => {
  const data = await getPosts();

  return json({ posts: data.posts });

  // return new Response(JSON.stringify({ posts: data.posts }), {
  // status: 200,
  // headers: {
  // "Content-Type": "application/json",
  // },
  // });
};

export default function Posts() {
  const { posts } = useLoaderData<typeof loader>();
  const adminUser = useOptionalAdminUser();

  const opts = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  // @ts-expect-error
  const formater = new Intl.DateTimeFormat("en-US", {
    ...opts,
    hour: "numeric",
  });

  return (
    <main>
      <h1>Posts</h1>
      {adminUser && (
        <Link
          prefetch="intent"
          to="admin"
          className="my-9 inline-block border-b-2 border-b-rose-600"
        >
          Admin
        </Link>
      )}
      <ul>
        {posts.map(({ slug, title, createdAt }) => {
          return (
            <li key={slug}>
              <Link className="text-blue-600 underline" to={slug}>
                {title}
              </Link>
              <div>{formater.format(new Date(createdAt))}</div>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
