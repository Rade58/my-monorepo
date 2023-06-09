import type { ActionArgs, LoaderArgs, Response } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
//
import {
  Form,
  useActionData,
  useLoaderData,
  useNavigation,
  useRouteError,
} from "@remix-run/react";
import { error } from "node:console";
import { requireAdminUser } from "~/session.server";

//
import invariant from "tiny-invariant";
//
import {
  createPost,
  getPostBySlug,
  updatePost,
  deletePost,
} from "~/models/post.server";

// WE ARE USING loader IN THIS CASE TO LOAD SPECIFIC POST DATA FOR
//              /posts/admin/:slug
// BUT WE ARE LOADING OTHER DATA IN CASE OF (WE ARE NOT LOADING POST)
// IN CASE OF  new
//              /posts/admin/new
//
export async function loader({ params, request }: LoaderArgs) {
  await requireAdminUser(request); // don't forget also action needs this

  // throwing error
  // this will pass a string as a value so data passed
  // to useLoaderData, wil be a string (and when it is a string
  // we know it is an error)
  invariant(params.slug, "Slug not found!");
  //
  // if `slug` is "now" we need to render create form
  // we won't search for post in this case because we
  // search for post only when we have a dynamic slug
  if (params.slug === "new") {
    return json({ post: null });
  }
  //
  const post = await getPostBySlug(params.slug);

  // we throw error if post is not found
  invariant(post, `Post with a slug: ${params.slug} not found!`);

  //
  return json({ post });
}

//
//
export async function action({ request, params }: ActionArgs) {
  await requireAdminUser(request); // action also needs aauthorization
  const formData = await request.formData();

  // THIS WILL INDICATE WHAT BUTTON WAS CLICKED
  // IF BUTTON HAD AN ATTRIBUE      name="intent"    AND
  // ATTRIBUTE       value="delete"
  // we know WHAT TO DO
  const intentVal = formData.get("intent");

  invariant(intentVal, "Intent doesn't exist!");

  // WE WILL DELETE POST HERE (SINCE FOR DELETION WE DO NOT NEED
  // TO VALIDATE ANYTHING)
  if (intentVal === "delete" && params.slug) {
    await deletePost(params.slug);

    return redirect("/posts/admin");
  }

  // ------

  const title = formData.get("title");
  const markdown = formData.get("markdown");

  // WE WOULD USE SOME KIND OV VALIDATOR LIKE
  // "zod" OR "yup"
  // AND VALUE OF VALIDATION WOULD BE ASSIGNEND TO THE PROPERTY
  // IF IT'S VALID, IT WOULD BE null, IF NOT IT WOULD BE AN
  // ERROR MESSAGE

  const errors = {
    title: title ? null : "Title is required!",
    markdown: markdown ? null : "Markdown is required!",
  };

  const hasErrors = Object.values(errors).some((err) => err);

  if (hasErrors) {
    return json(errors);
  }

  // THIS IS A MESSY WAY OF DOING THING
  // (BUT CREATOR OF WORKSHOP LIKES THIS)
  // THIS IS A TYPESCRIPT THING
  // BECAUSE TYPESCRIPT DOESN'T KNOW WE ALREADY CHECKED
  //   title    AND    markdown,
  // (I THINK THIS NEXT CHECK WE SHOULD PERFORM
  // INSIDE errors OBJECT AABOVE WITH
  // YUP OR WITH ZOD)
  // TYPESCRIPT WILL YELL AT US
  // SO TO PLEASE TYPESCRIPT WE WILL DO INVARIANT

  invariant(typeof title === "string", "Title must be string!");
  invariant(typeof markdown === "string", "Markdown must be string!");

  // ---
  //
  if (params.slug && params.slug === "new") {
    // check if slug already exists before creating new (don't have time for this)

    const neuPost = await createPost({ title, markdown });

    // you can use this instead redirect() function
    return redirect(`/posts/admin/${neuPost.slug}`);
    /* return new Response(null, {
      headers: {
        // Location: `/posts/admin/${neuPost.slug}`,
        Location: `/posts/admin`,
      },
      status: 302,
    }); */
  }

  if (intentVal === "update" && params.slug) {
    const updatedPost = await updatePost(params.slug, { markdown, title });

    // return json({ post: updatedPost });
    // you can use this instead redirect() function
    //  I'm doing this to trigger navigation and
    // by doing this I can disply spinner because I want to use
    // useNavigation HOOK
    return redirect(`/posts/admin/${updatedPost.slug}`);
    /* return new Response(null, {
      headers: {
        Location: `/posts/admin/${updatedPost.slug}`,
        // Location: `/posts/admin`,
      },
      status: 302,
    }); */
  }

  return redirect("/");
}

export function ErrorBoundary() {
  const error = useRouteError();

  return <div className="text-orange-950">Unexpected Error Occured</div>;
}

// if we are on /posts/adMin/:slug
// we will render post data as a default value inside
// input and textarea

const inputClassName = `w-full rounded border border-gray-500 px-2 py-1 text-lg`;

export default function PostAdminOrNewPost() {
  const data = useLoaderData<typeof loader>();
  const errors = useActionData<typeof action>();

  const navig = useNavigation();

  const isSubmitting = navig.state === "submitting";

  const displayDeleteAndUpdateButtons = data.post !== null;
  const isDeleting = navig.formData?.get("intent") === "delete";
  const isUpdating = navig.formData?.get("intent") === "update";

  return (
    <Form method="post">
      <p>
        <label>
          Post Title:{" "}
          <em className="h-6 text-red-600">
            {errors && errors.title ? errors.title : ""}
          </em>
          <input
            defaultValue={data?.post?.title}
            type="text"
            name="title"
            key={data?.post?.title ?? "new"}
            className={inputClassName}
          />
        </label>
      </p>
      <p>
        <label htmlFor="markdown">
          <em className="h-6 text-red-600">
            {errors && errors.markdown ? errors.markdown : ""}
          </em>
        </label>
        Markdown:
        <textarea
          id="markdown"
          defaultValue={data?.post?.markdown}
          name="markdown"
          key={data?.post?.markdown ?? "new"}
          className={`${inputClassName} font-mono`}
        ></textarea>
      </p>
      <p className="text-right">
        <button
          type="submit"
          // 🐨 add a name of "intent" and a value of "create" if this is a new post or "update" if it's an existing post
          name="intent"
          value={displayDeleteAndUpdateButtons ? "update" : "create"}
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-400 disabled:bg-blue-300"
          // 🐨 this should be disabled if we're creating *or* updating
          disabled={isSubmitting}
        >
          {/* 🐨 if this is a new post then this works fine as-is, but if we're updating it should say "Updating..." / "Update" */}
          {displayDeleteAndUpdateButtons ? (
            <>{isSubmitting && isUpdating ? "Updating..." : "Update Post"}</>
          ) : (
            <>{isSubmitting ? "Creating..." : "Create Post"}</>
          )}
        </button>
        {displayDeleteAndUpdateButtons && (
          <button
            type="submit"
            name="intent"
            value="delete"
            className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600 focus:bg-red-400 disabled:bg-red-300"
          >
            <>{isSubmitting && isDeleting ? "Deleting..." : "Delete Post"}</>
          </button>
        )}
        <br />
        {isSubmitting && (
          <div className="flex h-[10vh] w-full items-center justify-center border-0">
            <div className="flex items-center justify-center">
              <div className="h-16 w-16 animate-spin rounded-full border-b-2 border-t-2 border-indigo-900"></div>
            </div>
          </div>
        )}
      </p>
    </Form>
  );
}
