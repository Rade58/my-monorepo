import { json } from "@remix-run/node";
import type { LoaderArgs } from "@remix-run/node";
import { Link } from "@remix-run/react";

import { requireAdminUser } from "~/session.server";
export async function loader({ request }: LoaderArgs) {
  await requireAdminUser(request);
  // loader  always need to return a response
  // we don't have anything else to pass here
  // we only authorized the page
  // but we need the pass something
  return json({});
}

export default function AdminPostsIndex() {
  return (
    <p>
      <Link to="new" className="text-blue-600 underline">
        ➕ Create a New Post
      </Link>
      {/* YOU CAN'T USE process ON FRONTEND */}
      {/* <p className="border-2 border-rose-100">{process.env.ADMIN_EMAIL}</p> */}
      {/* IF IT'S NOT DANGEROUS TO HAVE ENV VARIABLE IN FRONTEND */}
      {/* WE CREATED GLOBAL VARIABLE CALLED `ENV` WHERE WE PLACED ALL THE 
      VARIABLE THAT ARE SAFE TO BE USED IN FRONTEND */}
      {/* WE SETTED THESE IN `entry.server.tsx` AND ALSO IN IN ROT LOADER*/}
      {/* CHECK THIS URL TO SEE WHAT WE NEED TO SET UP IN ORDER THIS TO WORK */}

      {/* SEE, AT THE END BY USING THIS IT WILL THROW HYDRATION ERROR IN */}
      {/* I GUESS BECAUSE WE ARE USING SOMETHING FROM THE BROWSER DIRECTLY IN OUT UI */}
      {/* BUT EVERYTHING WORKS */}

      <div className="border-2 border-rose-100">{ENV.ADMIN_EMAIL}</div>
    </p>
  );
}
