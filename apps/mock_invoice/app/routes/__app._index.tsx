import { Link } from "@remix-run/react";

import type { LoaderArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { requireUser } from "~/session.server";

export async function loader({ request }: LoaderArgs) {
  await requireUser(request);
  return redirect("/sales/invoices");
}

export default function AppIndex() {
  return (
    <div>
      Go to the
      <Link className="link link-info" to="sales">
        sales
      </Link>
      page...
    </div>
  );
}
