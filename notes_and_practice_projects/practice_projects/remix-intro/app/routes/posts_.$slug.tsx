import { json } from "@remix-run/node";
import type { LoaderArgs } from "@remix-run/node";
import { marked } from "marked";
import {
  Link,
  isRouteErrorResponse,
  useCatch,
  useLoaderData,
  useParams,
  useRouteError,
} from "@remix-run/react";
import { getPostBySlug } from "~/models/post.server";
import { useOptionalAdminUser } from "~/utils";

export async function loader(loadArgs: LoaderArgs) {
  const { slug } = loadArgs.params;

  if (!slug) {
    // return json({ post: null });
    throw new Error("Rade, you don't have a slug!");
  }

  const post = await getPostBySlug(slug);

  // ---------- catch error

  if (!post) {
    // throw new Error("Rade, your post is not found!");

    throw new Response("not found", { status: 404 });
  }
  const html = marked(post.markdown, { mangle: false });

  return json({ post, html });
}

export function ErrorBoundary() {
  // NO ERROR AS PAARAMETER ,WE USE HOOK
  //
  const error = useRouteError();

  console.log({ error });

  const isRouteError = isRouteErrorResponse(error);

  // IF IT IS ROUTE ERROR IT SHOULD HAVE status on it
  if (isRouteError) {
    return (
      <div>
        {/* <div className="text-4xl text-rose-800">404</div> */}
        <p className="text-4xl text-red-600">
          {"status" in error ? error.status : "Something went wrong"}
        </p>
      </div>
    );
  }

  // IF WE THRPW ERROR RESPONSE IN loaer (I DID WITH 404)
  // WE USE THIS TO SHOW SPECIAL UI
  // isRouteErrorResponse

  return (
    <div className="text-red-600">
      Unexpected Error Occured:{" "}
      {error instanceof Response ? error.status : "Something went wrong"}
    </div>
  );
}

export default function Post() {
  // blah();

  const adminUser = useOptionalAdminUser();

  const { post, html } = useLoaderData<typeof loader>();
  const params = useParams();
  /* if (!post) {
    return <div>Error, no post</div>;
  } */

  return (
    <main className="mx-auto max-w-4xl">
      <h1 className="my-6 border-b-2 text-center text-3xl">{post.title}</h1>
      <p>{JSON.stringify(params)}</p>

      <div className="prose" dangerouslySetInnerHTML={{ __html: html }} />

      {adminUser && (
        <Link className="text-teal-600" to={`/posts/admin/${post.slug}`}>
          Edit
        </Link>
      )}
    </main>
  );
}
