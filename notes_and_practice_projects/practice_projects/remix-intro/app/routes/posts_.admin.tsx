import { LoaderArgs, json } from "@remix-run/node";
import { Link, Outlet, useLoaderData, useRouteError } from "@remix-run/react";

import { getPostSlugsAndTitles } from "~/models/post.server";
import { requireAdminUser } from "~/session.server";
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

// CAN CATCH ERRORS FROM loader TOO (SO IT CATCHES SERVER SIDE ERRORS TOO)
export function ErrorBoundary() {
  const error = useRouteError();

  console.log(error);

  return (
    <div className="text-rose-300">
      Unexpected Error Occured In Admin Dashboard
    </div>
  );
}

export const loader = async ({ request }: LoaderArgs) => {
  // to protect all routes we need to call this
  // inside all routes that are child routes
  // of /admin
  await requireAdminUser(request);

  const data = await getPosts();

  return json({ posts: data.posts });

  // return new Response(JSON.stringify({ posts: data.posts }), {
  // status: 200,
  // headers: {
  // "Content-Type": "application/json",
  // },
  // });
};

export default function PostsAdmin() {
  const { posts } = useLoaderData<typeof loader>();

  // throw new Error("Hello world");

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="my-6 border-b-2 text-center text-3xl">Blog Admin</h1>
      <div className="grid grid-cols-4 gap-6">
        <nav className="col-span-4 md:col-span-1">
          <ul>
            {posts.map((post) => (
              <li key={post.slug}>
                <Link
                  prefetch="intent"
                  to={post.slug}
                  className="text-blue-600 underline"
                >
                  {post.title}
                </Link>
              </li>
            ))}
            <li>
              <Link to="new" className="text-blue-600 underline">
                ➕ Create New Post
              </Link>
            </li>
          </ul>
        </nav>
        <main className="col-span-4 border border-teal-600 md:col-span-3">
          {/* 🐨 your job is to add an Outlet component here */}

          <Outlet />
        </main>
      </div>
    </div>
  );
}
