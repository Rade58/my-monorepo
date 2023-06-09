import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction, LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import type { ShouldRevalidateFunction } from "@remix-run/react";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";

import themes from "../themes/list";

import { getUser } from "~/session.server";
import stylesheet from "~/tailwind.css";

// WE WILL USE THIS COMPONENT IN `IMPERATIVE MUTATION`
// EXERCISE(YOU CAN CHANGE LOGOUT PERIOD)
import LogoutTimer from "./components/auth/LogoutTimer";
// WE CONDITIONALLY RENDERED THIS COMPONENT
// FOR THE REST OF THE CODE FOR THE IMPERATIVE MUTATION EXERCISE
// LOOK INSIDE THE LogoutTimer COMPONENT

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export const loader = async ({ request }: LoaderArgs) => {
  return json({ user: await getUser(request) });
};

// (this is not unstable anymore)
// 🐨 Add unstable_shouldReload here and only reload the data if the transition
// has a submission where the action is "/login" or "/logout"

export const shouldRevalidate: ShouldRevalidateFunction = ({
  // actionResult,
  // formMethod,
  // currentParams,
  defaultShouldRevalidate,
  formAction,
}) => {
  // console.log({ formAction });
  /* 
  if (formAction?.startsWith("/sales/invoices/")) {
    return false;
  } */

  // THIS WAS PART OF EXERCISE FOR REVALIDATION OPTIMIZATION
  // BUT I NEEDED TO REVALIDATE IN CASE OF OTHER EXERCISES THAT CONCENR USER
  // EXISTANCE
  /* if (formAction === "/logout" || formAction === "/login") {
    return false;
  } */

  return defaultShouldRevalidate;
};

// ------------------------------------------------------------
// ------------------------------------------------------------

export default function App() {
  const { user } = useLoaderData<typeof loader>();
  console.log({ user });
  return (
    <html lang="en" className="h-full" data-theme={themes[1]}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="h-full">
        <Outlet />
        {/* THIS IS THE PART OF THE EXERCISE FOR THE IMPERATIVE MUTATIONS */}
        {user ? <LogoutTimer /> : null}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
