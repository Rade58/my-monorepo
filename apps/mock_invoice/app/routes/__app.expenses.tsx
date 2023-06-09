import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { requireUser } from "~/session.server";

export async function loader({ request }: LoaderArgs) {
  await requireUser(request);

  return json({});
}

export default function Expenses() {
  return <div>Expenses</div>;
}
